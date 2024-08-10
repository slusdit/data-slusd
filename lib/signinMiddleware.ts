'use server'
import { Profile } from "next-auth";
import { AeriesSimpleStaff, AeriesSimpleTeacher, getAeriesStaff, getTeacherSchoolCredentials, runQuery } from "./aeries";
import prisma from "./db";

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
    const schools = await prisma.schoolInfo.findMany({
        select: {
            sc: true
        }
    })
    
    await prisma.user.update({
        where: {
            email: profileEmail
        },
        data: {
            primarySchool,
            psl
        }
    })

    // Not working properly
    if (allSchools.length > 0) {
        const schoolCodes = schools.map((school) => school.sc)
        console.log(schools)
        const allSchoolCodes = allSchools.filter((school) => schoolCodes.includes(school.toString()))

        for (const school of allSchoolCodes ){
            console.log(school)
            console.log(schoolCodes)
            if (schoolCodes.includes(school.toString())) {
                console.log(school)
                // const addSchool = await prisma.user.update({
                //     where: {
                //         email: profileEmail
                //     },
                //     data: {
                //         school: {
                //             set: {
                //                 sc: school.toString()
                //             }
                //         }
                //     }
                // })
            }
        }
    }
   
    return null
}

export async function getAllSchools(profileEmail: string) {
    
    const results = await setPrimarySchool(profileEmail)
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



export async function setPrimarySchool(profileEmail: string):Promise<GetAllSchoolsReturn> {
    
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

    // Update Schools
    const primarySchoolUpdate = await prisma.user.update({
        where: {
            id: profileId
        },
        data: {
            school: {
                set: {
                    sc: aeriesPermissions.primarySchool.toString()               
                 }
            }
        }
    })

    console.log({ primarySchoolUpdate })

    return ({
        displayResult,
        newAeriesClasses,
        aeriesClasses,
        currentClasses
    } );
}