import { Separator } from "@/components/ui/separator";
import AddQueryForm from "./forms/AddQueryForm";
import FormDialog from "./forms/FormDialog";
import { QuerySheet } from "./QueiesSheet";
import QueryList from "./QueryList";
import { Plus } from "lucide-react";
import { Session } from "next-auth";
import { QueryCategory, ROLE } from "@prisma/client";
import { QueryWithCategory } from "./QueryBar";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const Sidebar = async({
    session,
    categories,
    queries,
    accordion = false
}: {
    session: Session | null,
    categories: QueryCategory[],
    queries: QueryWithCategory[]
    accordion?: boolean
}) => {

    return (

        <div className="min-w-60 w-1/6 mr-4 p-2 flex flex-col gap-2 justify-top">
            {/* {(
                session?.user?.roles?.includes("ASSESSMENT") ||
                session?.user?.roles?.includes("SUPERADMIN")) && 
                (
                    <>
                        <div className="flex justify-center">
                            <Link href="/assessment/grades" className="text-primary px-4 py-2">Assessment</Link>
                        </div>
                        <Separator className="my-4 w-full" />
                    </>

                )} */}
            {(
                session?.user?.roles?.includes("PRINCIPAL") ||
                session?.user?.roles?.includes("GRADEDISTRIBUTION") ||
                session?.user?.roles?.includes("SUPERADMIN")) && 
                (
                    <>
                        <Button asChild className="flex justify-center">
                            <Link href="/gradedistribution" className="text-primary px-4 py-2">Grade Distribution</Link>
                        </Button>
                        <Separator className="my-4 w-full" />
                    </>

                )}
            <h2 className="font-bold text-center text-lg underline">Reports</h2>
            {session?.user?.queryEdit && (
                <div className="flex justify-center">

                    <FormDialog
                        triggerMessage="Add Query"
                        icon={<Plus className="py-1" />}
                        title="Add Query"

                    >
                        <AddQueryForm session={session} categories={categories} />
                    </FormDialog>
                </div>
            )}

            <Separator className="my-4 w-full" />


            {/* <QuerySheet
            categories={categories}
            queries={queries}
            database={process.env.DB_DATABASE as string}
            roles={session?.user?.roles}
            user={session?.user}
            accordion
        /> */}
            <QueryList
                queries={queries}
                categories={categories}
                roles={session?.user?.roles}
                email={session?.user?.email}
                user={session?.user}
                accordion
            />
            {/* <Button variant="link" className="w-full" asChild>
          <Link href="/attendance">Attendance</Link>
        </Button> */}

        </div>
    )
}

export default Sidebar

