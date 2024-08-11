'use server'
import { Profile } from "next-auth";
import { AeriesSimpleStaff, AeriesSimpleTeacher, getAeriesStaff, getTeacherSchoolCredentials, runQuery } from "./aeries";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from "@/auth";

type GetAllSchoolsReturn = {
    primarySchool: number
    psl: number
    allSchools: number[]
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
        console.log(existingSchoolCodes)

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
    const allSchoolsResults = await runQuery(allSchoolsQuery)
    console.log({ allSchoolsResults })
    results['allSchools'] = allSchoolsResults.map((school) => school.SCH)
    console.log({ results })
    const user = await prisma.user.findUnique({
        where: {
            email: profileEmail
        },
        
    })
    console.log({ user }) 
    console.log({ results})
    if (!user?.primarySchool) {
        console.log(profileEmail)
        const ret = await updateSchools(profileEmail, results)
        console.log(ret)
    }
    return results
    
}


export async function updateActiveSchool(userId: string, activeSchool: number) {
    const update =await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            activeSchool
        }
    })
    console.log(update)
    const headersList = headers()
    console.log(headersList)
    const currentPath = headers().get('referer') || '/'
    console.log(currentPath)
    console.log(headersList.get('x-invoke-path'))
    // const currentPath = new URL(request.url).pathname
    // redirect(currentPath)
    redirect('/')

    // revalidatePath('/')

    return await auth()
}

export async function getPrimarySchool(profileEmail: string):Promise<GetAllSchoolsReturn> {
    
    const primarySchoolQuery = `SELECT PSC 'primarySchool', ID 'psl' FROM STF WHERE EM = '${profileEmail}'`
    console.log(primarySchoolQuery)
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
    console.log(aeriesPermissions)

    if (aeriesPermissions.title.toLowerCase() === 'teacher') {
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

    console.log({ schools })

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
    } );
}