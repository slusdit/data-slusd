import { Separator } from "@/components/ui/separator";
import AddQueryForm from "./forms/AddQueryForm";
import FormDialog from "./forms/FormDialog";
import { QuerySheet } from "./QueiesSheet";
import QueryList from "./QueryList";
import { Plus } from "lucide-react";
import { Session } from "next-auth";
import { QueryCategory } from "@prisma/client";
import { QueryWithCategory } from "./QueryBar";


const Sidebar = ({
    session,
    categories,
    queries
}: {
    session: Session | null,
    categories: QueryCategory[],
    queries: QueryWithCategory[]
}) => (
    <div className="min-w-60 w-1/6 mr-4 p-2 flex flex-col gap-2 justify-top">
        <h2 className="font-bold text-center text-lg underline">Menu</h2>
        {session?.user?.queryEdit && (
            <div className="w-1/12">

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


        <QuerySheet
            categories={categories}
            queries={queries}
            database={process.env.DB_DATABASE as string}
            roles={session?.user?.roles}
            user={session?.user}
        />
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

export default Sidebar