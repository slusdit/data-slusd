'use server'
import { AeriesSimpleStaff, AeriesSimpleTeacher, getAeriesStaff, getTeacherSchoolCredentials } from "./aeries";
import prisma from "./db";

export default async function syncTeacherClasses(profileId: string, profileEmail: string) {

    function isMatched(obj1: any, array2: any[], key1: string, key2: string) {
        const objKey = obj1[key1]
        // // console.log({ obj1, array2, key1, key2, objKey });
        return array2.some(obj2 => {
            // // console.log(obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2])
            return obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2]
        });
    }
    // console.log(profileEmail)
    let aeriesPermissions: AeriesSimpleStaff | AeriesSimpleTeacher | null = await getAeriesStaff({ email: profileEmail, endpoint: "/api/v5/staff" });
    let aeriesClasses: AeriesSimpleTeacher[] | undefined
    if (!aeriesPermissions) {
        return null
    }
    console.log(aeriesPermissions)

    if (aeriesPermissions.title.toLowerCase() === 'teacher') {
        aeriesClasses = await getTeacherSchoolCredentials({ id: aeriesPermissions.id, schools: aeriesPermissions.schoolPermissions, })

    }
    // console.log(aeriesClasses)

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
        // console.log(currentClasses)
        // console.log(aeriesClasses)
        if (currentClasses.length > 0) {

            // console.log(aeriesClasses.length)

            // Filter out classes that are not in already in the DB
            newAeriesClasses = aeriesClasses.filter(
                aeriesClass => {
                    const test = !isMatched(aeriesClass, currentClasses, 'sc', 'tn')
                    // console.log({ test })
                    return test
                }
            );


            const oldCurrentClasses = currentClasses.filter(
                currentClass => {
                    const test = !isMatched(currentClass, aeriesClasses, 'sc', 'tn')
                    // console.log({ test })
                    return test
                }
            );

            // console.log(oldCurrentClasses)
            // console.log(newAeriesClasses)

            if (newAeriesClasses.length > 0) {
                // Add new classes to DB
                // console.log(newAeriesClasses)
                newAeriesClasses.map(async (aeriesClass) => {
                    const newClass = await prisma.class.create({ data: aeriesClass })
                    const result = await prisma.userClass.create({
                        data: {
                            classId: newClass.id,
                            userId: profileId,
                        }
                    })
                    // console.log(result)
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