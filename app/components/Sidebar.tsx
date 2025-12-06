import { Separator } from "@/components/ui/separator";
import AddQueryForm from "./forms/AddQueryForm";
import FormDialog from "./forms/FormDialog";
import QueryList from "./QueryList";
import { Plus } from "lucide-react";
import { Session } from "next-auth";
import { QueryCategory } from "@prisma/client";
import { QueryWithCategory } from "./QueryBar";

const Sidebar = async ({
  session,
  categories,
  queries,
  accordion = false,
}: {
  session: Session | null;
  categories: QueryCategory[];
  queries: QueryWithCategory[];
  accordion?: boolean;
}) => {
  if (!session?.user) {
    return null;
  }

  return (
    <div className="p-4 flex flex-col gap-2 h-full">
      {/* Reports Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Reports</h2>
        {session?.user?.queryEdit && (
          <FormDialog
            triggerMessage=""
            icon={<Plus className="h-4 w-4" />}
            title="Add Query"
          >
            <AddQueryForm session={session} categories={categories} />
          </FormDialog>
        )}
      </div>

      <Separator />

      {/* Query List */}
      <div className="flex-1 overflow-y-auto">
        <QueryList
          queries={queries}
          categories={categories}
          roles={session?.user?.roles}
          email={session?.user?.email}
          user={session?.user}
          accordion={accordion}
        />
      </div>
    </div>
  );
};

export default Sidebar;
