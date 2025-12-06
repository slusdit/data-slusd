'use server'
import { Profile } from "next-auth";
import { AeriesSimpleStaff, AeriesSimpleTeacher, getAeriesStaff, getTeacherSchoolCredentials, runQuery } from "./aeries";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from "@/auth";
import { ROLE } from "@prisma/client";

type GetAllSchoolsReturn = {
    primarySchool: number
    psl: number
    allSchools: number[]
}

// Map Aeries job titles to Data Dashboard roles
const TITLE_TO_ROLE_MAP: Record<string, ROLE> = {
    'teacher': ROLE.TEACHER,
    'principal': ROLE.PRINCIPAL,
    'assistant principal': ROLE.PRINCIPAL,
    'vice principal': ROLE.PRINCIPAL,
    'counselor': ROLE.COUNSELOR,
    'nurse': ROLE.NURSE,
    'librarian': ROLE.LIBRARIAN,
    'director': ROLE.DIRECTOR,
    'superintendent': ROLE.SUPERADMIN,
    'assistant superintendent': ROLE.DIRECTOR,
}

/**
 * Determines the appropriate role based on Aeries job title
 */
function getRoleFromTitle(title: string): ROLE {
    const normalizedTitle = title.toLowerCase().trim()

    // Check for exact matches first
    if (TITLE_TO_ROLE_MAP[normalizedTitle]) {
        return TITLE_TO_ROLE_MAP[normalizedTitle]
    }

    // Check for partial matches (e.g., "Elementary Teacher" contains "teacher")
    for (const [key, role] of Object.entries(TITLE_TO_ROLE_MAP)) {
        if (normalizedTitle.includes(key)) {
            return role
        }
    }

    // Default to STAFF for any recognized employee, USER for unknown
    return ROLE.STAFF
}

/**
 * Syncs user roles from Aeries based on their job title
 * This ensures permissions are kept up-to-date with Aeries data
 */
export async function syncUserRolesFromAeries(userId: string, aeriesTitle: string, primarySchool: number) {
    const baseRole = getRoleFromTitle(aeriesTitle)

    // Find or create the role record for this base role
    let roleRecord = await prisma.role.findFirst({
        where: { role: baseRole }
    })

    if (!roleRecord) {
        roleRecord = await prisma.role.create({
            data: { role: baseRole }
        })
    }

    // Check if user already has this role
    const existingUserRole = await prisma.userRole.findFirst({
        where: {
            userId,
            roleId: roleRecord.id
        }
    })

    if (!existingUserRole) {
        // Add the role to the user
        await prisma.userRole.create({
            data: {
                userId,
                roleId: roleRecord.id
            }
        })
    }

    // Update the user's primaryRole field
    await prisma.user.update({
        where: { id: userId },
        data: { primaryRole: baseRole }
    })

    return baseRole
}



export async function updateSchools(profileEmail: string, allQueriedSchools?: GetAllSchoolsReturn) {
    if (!allQueriedSchools) {
        allQueriedSchools = await getAllSchools(profileEmail)
    }
    const { psl, primarySchool, allSchools } = allQueriedSchools

    // Update primary school and PSL
    const user = await prisma.user.update({
        where: {
            email: profileEmail
        },
        data: {
            primarySchool,
            psl
        }
    })

    // Handle school associations
    if (allSchools.length > 0) {
        const existingSchools = await prisma.schoolInfo.findMany({
            where: {
                sc: {
                    in: allSchools.map(school => school.toString())
                }
            },
            select: {
                sc: true
            }
        })

        const existingSchoolCodes = existingSchools.map(school => school.sc)
        // console.log(existingSchoolCodes)

        // First, remove all existing school associations
        await prisma.userSchool.deleteMany({
            where: { userId: user.id }
        });

        // Then, create new associations
        await prisma.user.update({
            where: { id: user.id },
            data: {
                UserSchool: {
                    create: existingSchoolCodes.map(sc => ({
                        school: {
                            connect: { sc: sc }
                        }
                    }))
                }
            }
        });

        // const updateUser = await prisma.user.update({
        //     where: {
        //         email: profileEmail
        //     },
        //     data: {
        //         UserSchool: {
        //             deleteMany: {}, // Remove all existing associations
        //             createMany: {
        //                 data: existingSchoolCodes.map(sc => ({ schoolSc: sc.toString() })),
        //                 skipDuplicates: true
        //             }
        //         }
        //     }
        // })
        // const user = await prisma.user.update({
        //     where: {
        //         email: profileEmail
        //     },
        //     data: {
        //         primarySchool,
        //         psl
        //     }
        // })

        // for (const sc of existingSchoolCodes) {
        //     try {
        //         await prisma.userSchool.create({
        //             data: {
        //                 userId: user.id,
        //                 schoolSc: sc
        //             }
        //         })
        //         console.log(`Created association for school: ${sc}`);
        //     } catch (error) {
        //         console.error(`Error creating association for school ${sc}:`, error);
        //     }
        // }

        // console.log({ updateUser })
    }

    return null
}

export async function getAllSchools(profileEmail: string) {

    const results = await getPrimarySchool(profileEmail)
    const profileName = profileEmail.split('@')[0]
    const allSchoolsQuery = `SELECT SCH FROM USR where NM like '${profileName}%' and DEL = 0`
    // console.log(allSchoolsQuery)
    const allSchoolsResults = await runQuery(allSchoolsQuery)
    // console.log({ allSchoolsResults })
    results['allSchools'] = allSchoolsResults.map((school) => school.SCH)
    // console.log({ results })
    const user = await prisma.user.findUnique({
        where: {
            email: profileEmail
        },
    })

    // Always update schools on sign-in to ensure permissions are current
    // Previously only updated when primarySchool was null, which meant returning users
    // never got their school assignments refreshed from Aeries
    if (user) {
        await updateSchools(profileEmail, results)
    }
    return results

}


export async function updateActiveSchool(userId: string, activeSchool: number) {
    const update = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            activeSchool
        }
    })
    const headersList = await headers()
    const referer = headersList.get('referer')
    const currentPath = referer ? new URL(referer).pathname : '/'
    // console.log('Redirecting to:', currentPath)
    redirect('/')
    redirect(currentPath)



}

export async function getPrimarySchool(profileEmail: string): Promise<GetAllSchoolsReturn> {

    const primarySchoolQuery = `SELECT PSC 'primarySchool', ID 'psl' FROM STF WHERE EM = '${profileEmail}'`
    // console.log(primarySchoolQuery)
    const primarySchoolResults = await runQuery(primarySchoolQuery)
    return primarySchoolResults[0]

}

export async function syncTeacherClasses(profileId: string, profileEmail: string) {

    function isMatched(obj1: any, array2: any[], key1: string, key2: string) {
        const objKey = obj1[key1]
        return array2.some(obj2 => {
            return obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2]
        });
    }
    let aeriesPermissions: AeriesSimpleStaff | AeriesSimpleTeacher | null = await getAeriesStaff({ email: profileEmail, endpoint: "/api/v5/staff" });
    let aeriesClasses: AeriesSimpleTeacher[] | undefined
    if (!aeriesPermissions) {
        return null
    }

    // Sync user roles based on Aeries job title
    // This auto-assigns TEACHER, PRINCIPAL, COUNSELOR, etc. based on their Aeries title
    await syncUserRolesFromAeries(profileId, aeriesPermissions.title, aeriesPermissions.primarySchool)

    // Check if user is a teacher and sync their classes
    const titleLower = aeriesPermissions.title.toLowerCase()
    if (titleLower === 'teacher' || titleLower.includes('teacher')) {
        aeriesClasses = await getTeacherSchoolCredentials({ id: aeriesPermissions.id, schools: aeriesPermissions.schoolPermissions, })

    }

    // Check DB for current Teacher info with matching PSL == id

    const currentClasses = await prisma.class.findMany({
        where: {
            email: aeriesPermissions.email
        }
    })



    let displayResult = 'No Acttions'
    let newAeriesClasses: AeriesSimpleTeacher[] = []
    // If teachers have current classes in Aeries and current classes in DB
    if (aeriesClasses && aeriesClasses.length > 0) {
        if (currentClasses.length > 0) {
            // Filter out classes that are not in already in the DB
            newAeriesClasses = aeriesClasses.filter(
                aeriesClass => {
                    const test = !isMatched(aeriesClass, currentClasses, 'sc', 'tn')
                    return test
                }
            );


            const oldCurrentClasses = currentClasses.filter(
                currentClass => {
                    const test = !isMatched(currentClass, aeriesClasses, 'sc', 'tn')

                    return test
                }
            );


            if (newAeriesClasses.length > 0) {
                // Add new classes to DB
                newAeriesClasses.map(async (aeriesClass) => {
                    const newClass = await prisma.class.create({ data: aeriesClass })
                    const result = await prisma.userClass.create({
                        data: {
                            classId: newClass.id,
                            userId: profileId,
                        }
                    })
                })

                displayResult = `Some New Classes Added`
            }

            if (oldCurrentClasses.length > 0) {
                // Delete old classes from DB
                // console.log(oldCurrentClasses)
                await Promise.all(oldCurrentClasses.map(async (oldClass) => {
                    if (oldClass.activeOverride) return null
                    const result = await prisma.class.delete({
                        where: {
                            id: oldClass.id,
                            activeOverride: false
                        }

                    })
                    // console.log(result)
                })
                )
                displayResult = 'Out of date classes exists, Old Classes Deleted'
            }
        } else {
            // Add all classes to DB
            // console.log(aeriesClasses )
            aeriesClasses.map(async (aeriesClass) => {
                const newClass = await prisma.class.create({ data: aeriesClass })
                const result = await prisma.userClass.create({
                    data: {
                        classId: newClass.id,
                        userId: profileId,
                    }
                })
                // console.log(result)
            })


            displayResult = ` classes added - All Classes Added`

        }
    } else {
        if (currentClasses.length > 0) {
            // if no aeries classes and there are current classes then delete all current classes
            const results = await prisma.class.deleteMany({
                where: {
                    email: aeriesPermissions.email,
                    activeOverride: false

                }
            })
            // console.log(results)
            displayResult = `${results.count} - All Classes Deleted`
        }

    }

    const schools = await prisma.user.findUnique({
        where: {
            id: profileId
        },
        select: {
            school: true
        }
    })

    // console.log({ schools })

    // // Update Schools
    // const primarySchoolUpdate = await prisma.user.update({
    //     where: {
    //         id: profileId
    //     },
    //     data: {
    //         school: {
    //             set: {
    //                 sc: aeriesPermissions.primarySchool.toString()               
    //              }
    //         }
    //     }
    // })

    // console.log({ primarySchoolUpdate })

    return ({
        displayResult,
        newAeriesClasses,
        aeriesClasses,
        currentClasses
    });
}