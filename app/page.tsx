import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import AddQueryForm from "./components/forms/AddQueryForm";
import FormDialog from "./components/forms/FormDialog";
import { Plus } from "lucide-react";

const prisma = new PrismaClient();
export default async function Home() {
  const session = await auth();
  const queries = await prisma.query.findMany();
  console.log(queries)
  
  let categories
  if (session?.user?.admin) {
    categories = await prisma.queryCategory.findMany();
  }
  return (
    <div
      className="m-auto mt-10 self-center rounded-lg bg-success-200 hover:bg-success-100"
    >
      <h1 className="text-3xl font-weight-800 mb-5">
        Logged in
      </h1>
      {session?.user?.admin && (
          <FormDialog
            triggerMessage="Add Query"
            icon={<Plus className="py-1" />}
            title="Add Query"
          >
            <AddQueryForm
              session={session}
       
              categories={categories}
            />
          </FormDialog>
        )}
          
      <h2 className="font-bold text-2xl mb-4">Pages</h2>
      <ul className="flex flex-col gap-1 w-2/3">


        {session?.user?.admin &&
          <li><Link href="/admin" className="hover:underline">Admin</Link></li>
        }

        <li><Link href="/profile" className="hover:underline">Profile</Link></li>
        <li><Link href="/test/1" className="hover:underline">Test</Link></li>

      </ul>
      <h2 className="font-bold text-2xl mb-4">Queries</h2>
      <ul className="flex flex-col gap-1 w-2/3">

        
        {queries.map(query => (
          <li key={query.id}>
            <Link href={`/query/${query.id}`} className="hover:underline">
              {query.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
