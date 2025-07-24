import { auth } from "@/auth";
import RenewSchools from "../components/RenewSchools";
import { AeriesSimpleStaff, AeriesSimpleTeacher, getAeriesStaff, getTeacherSchoolCredentials } from "@/lib/aeries";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import ChartTest from "./ChartTest";


export default async function Page() {

    function isMatched(obj1: any, array2: any[], key1: string, key2: string) {
        const objKey = obj1[key1]
        // console.log({ obj1, array2, key1, key2, objKey });
        return array2.some(obj2 => {
            // console.log(obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2])
            return obj1[key1] === obj2[key1] && obj1[key2] === obj2[key2]
        });
    }

    const session = await auth()

    let aeriesPermissions: AeriesSimpleStaff | AeriesSimpleTeacher | null = await getAeriesStaff({ endpoint: "/api/v5/staff", email: session?.user?.email as string });
    let aeriesClasses: AeriesSimpleTeacher[] | undefined
    if (!aeriesPermissions) {
        return null
    }

    if (aeriesPermissions.title.toLowerCase() === 'teacher') {
        aeriesClasses = await getTeacherSchoolCredentials({ id: aeriesPermissions.id, schools: aeriesPermissions.schoolPermissions, })

    }
    // console.log(aeriesPermissions)
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

            if (newAeriesClasses.length > 0) {
                // Add new classes to DB
                // console.log(newAeriesClasses)
                newAeriesClasses.map(async (aeriesClass) => {
                    const newClass = await prisma.class.create({ data: aeriesClass })
                    const result = await prisma.userClass.create({ 
                        data: {
                            classId: newClass.id,
                            userId: session?.user?.id as string,
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
            // console.log(aeriesClasses)
            aeriesClasses.map(async (aeriesClass) => {
                const newClass = await prisma.class.create({ data: aeriesClass })
                const result = await prisma.userClass.create({ 
                    data: {
                        classId: newClass.id,
                        userId: session?.user?.id as string,
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

    return (
        <div>
            <h1>Tests</h1>
            <ChartTest />
            {/* <RenewSchools fecthFunction={getAeriesStaff}    aeriesApiKey={process.env.AERIES_API_KEY} /> */}
            {/* <div className="text-blue font-bold">{displayResult}</div> */}
            {/* <div className="font-bold underline mt-8">aeriesPermissions</div> */}
            {/* <pre>{JSON.stringify(aeriesPermissions, null, 2)}</pre> */}
            {/* <div className="font-bold underline mt-8">aeriesClasses</div> */}
            {/* <pre>{JSON.stringify(aeriesClasses, null, 2)}</pre> */}
            {/* <div className="font-bold underline mt-8">currentClasses</div> */}
            {/* <pre>{JSON.stringify(currentClasses, null, 2)}</pre> */}
            {/* <div className="font-bold underline mt-8">Session.User</div> */}
            {/* <pre>{JSON.stringify(session?.user, null, 2)}</pre> */}

        </div>
    );
}