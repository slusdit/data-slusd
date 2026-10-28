import "server-only";
// Sign-in sync: pulls a user's role, schools and classes from Aeries when
// NextAuth's signIn event fires. That event runs before a session cookie
// exists, so the Aeries lookups here use runParameterizedQuerySystem rather
// than the session-guarded runner.
//
// This file is deliberately NOT a 'use server' module: nothing in it may be
// exposed as a client-callable server action, because these functions take a
// caller-supplied user id / email and write roles and school access.
import { AeriesSimpleStaff, AeriesSimpleTeacher, getAeriesStaff, getSchoolsFromUsrAccounts, getTeacherSchoolCredentials, runParameterizedQuerySystem } from "./aeries";
import prisma from "./db";
import { SYSTEM_ROLES, type SystemRoleName } from "./roles";
import sql from "mssql";

type GetAllSchoolsReturn = {
    primarySchool: number | null
    psl: number | null
    allSchools: number[]
}

// Map Aeries job titles to Data Dashboard roles
// Every target must be a system role (lib/roles.ts) so the row is guaranteed to exist.
const TITLE_TO_ROLE_MAP: Record<string, SystemRoleName> = {
    'teacher': "TEACHER",
    'principal': "PRINCIPAL",
    'assistant principal': "PRINCIPAL",
    'vice principal': "PRINCIPAL",
    'counselor': "COUNSELOR",
    'nurse': "NURSE",
    'librarian': "LIBRARIAN",
    'director': "DIRECTOR",
    'superintendent': "SUPERADMIN",
    'assistant superintendent': "DIRECTOR",
}

/**
 * Determines the appropriate role based on Aeries job title
 */
function getRoleFromTitle(title: string): SystemRoleName {
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
    return "STAFF"
}

/**
 * Syncs user roles from Aeries based on their job title
 * This ensures permissions are kept up-to-date with Aeries data
 */
export async function syncUserRolesFromAeries(userId: string, aeriesTitle: string, primarySchool: number) {
    const baseRole = getRoleFromTitle(aeriesTitle)

    // Find or create the role record for this base role (normally seeded by
    // ensureSystemRoles; created here only if the catalogue was never loaded)
    let roleRecord = await prisma.role.findUnique({
        where: { role: baseRole }
    })

    if (!roleRecord) {
        const seed = SYSTEM_ROLES.find((r) => r.role === baseRole)
        roleRecord = await prisma.role.create({
            data: { role: baseRole, label: seed?.label ?? baseRole, description: seed?.description, isSystem: true }
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

        // Replace all school associations atomically so a concurrent sign-in
        // (e.g. a second browser tab) can't observe the user mid-delete with no
        // schools. The delete + recreate run in a single transaction.
        await prisma.$transaction([
            prisma.userSchool.deleteMany({
                where: { userId: user.id }
            }),
            prisma.user.update({
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
            }),
        ]);

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

export async function getAllSchools(profileEmail: string, prefetchedStaff?: AeriesSimpleStaff | null) {

    const results = await getPrimarySchool(profileEmail) ?? { primarySchool: null, psl: null, allSchools: [] as number[] }

    // Prefer the Aeries API's SchoolAccessPermissions, falling back to an
    // exact-match USR lookup for the ~2/3 of staff records that carry no
    // per-school rows. (The original USR query was retired because its
    // `NM LIKE '<name>%'` match could return a different person's schools.)
    try {
        const aeriesStaff = prefetchedStaff ?? await getAeriesStaff({ email: profileEmail })
        if (!aeriesStaff) {
            throw new Error(`No Aeries staff record for ${profileEmail}`)
        }
        if (aeriesStaff.hasSchoolPermissions) {
            results['allSchools'] = aeriesStaff.schoolPermissions
        } else {
            // The staff record has no per-school rows, so the API can only
            // report the primary school. Fall back to the USR security table,
            // which is where district/site access is actually granted for these
            // accounts. getSchoolsFromUsrAccounts prefers the person's regular
            // login and only uses their ".net" network account if it is their
            // only one. Exact login matching keeps the old LIKE bug out.
            const usrSchools = await getSchoolsFromUsrAccounts(profileEmail)
            results['allSchools'] = usrSchools.length > 0
                ? usrSchools
                : aeriesStaff.schoolPermissions
        }
    } catch (error) {
        console.error("Failed to get school permissions from Aeries API, falling back to primary school:", error)
        // Fall back to primary school only if API call fails
        if (results.primarySchool) {
            results['allSchools'] = [results.primarySchool]
        } else {
            results['allSchools'] = []
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            email: profileEmail
        },
    })

    // Always update schools on sign-in to ensure permissions are current
    if (user) {
        await updateSchools(profileEmail, results)
    }
    return results

}


export async function getPrimarySchool(profileEmail: string): Promise<GetAllSchoolsReturn> {

    // Use parameterized query to prevent SQL injection
    const primarySchoolQuery = `SELECT PSC 'primarySchool', ID 'psl' FROM STF WHERE EM = @email`
    const primarySchoolResults = await runParameterizedQuerySystem(
        primarySchoolQuery,
        {
            email: { type: sql.VarChar, value: profileEmail }
        }
    )
    return primarySchoolResults[0]

}

/**
 * Insert classes and their user links in three statements instead of one
 * INSERT per class (finding P7).
 */
async function createClassesAndLinks(profileId: string, classes: AeriesSimpleTeacher[]) {
    if (classes.length === 0) return
    await prisma.class.createMany({ data: classes, skipDuplicates: true })
    const created = await prisma.class.findMany({
        where: { email: classes[0].email, OR: classes.map((c) => ({ sc: c.sc, tn: c.tn })) },
        select: { id: true },
    })
    await prisma.userClass.createMany({
        data: created.map((c) => ({ classId: c.id, userId: profileId })),
        skipDuplicates: true,
    })
}

export async function syncTeacherClasses(profileId: string, profileEmail: string, prefetchedStaff?: AeriesSimpleStaff | null) {

    function isMatched(obj1: any, array2: any[], key1: string, key2: string) {
        const objKey = obj1[key1]
        return array2.some(obj2 => {
            return obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2]
        });
    }
    const aeriesPermissions: AeriesSimpleStaff | null = prefetchedStaff ?? await getAeriesStaff({ email: profileEmail });
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
                // Add new classes to DB using createMany for better performance
                // First create all classes
                await createClassesAndLinks(profileId, newAeriesClasses)

                displayResult = `${newAeriesClasses.length} New Classes Added`
            }

            if (oldCurrentClasses.length > 0) {
                // Delete old classes from DB using deleteMany for better performance
                const classIdsToDelete = oldCurrentClasses
                    .filter(oldClass => !oldClass.activeOverride)
                    .map(oldClass => oldClass.id)

                if (classIdsToDelete.length > 0) {
                    await prisma.class.deleteMany({
                        where: {
                            id: { in: classIdsToDelete },
                            activeOverride: false
                        }
                    })
                }
                displayResult = `${classIdsToDelete.length} out-of-date classes deleted`
            }
        } else {
            // Add all classes to DB using batch operations for better performance
            await createClassesAndLinks(profileId, aeriesClasses)

            displayResult = `${aeriesClasses.length} classes added - All Classes Added`

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
