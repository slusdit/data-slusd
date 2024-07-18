import { auth } from "@/auth";
import { PrismaClient, QueryCategory } from "@prisma/client";
import Link from "next/link";
import AddQueryForm from "./components/forms/AddQueryForm";
import FormDialog from "./components/forms/FormDialog";
import { Plus } from "lucide-react";
import { QueryWithCategory } from "./components/QueryBar";
import { Separator } from "@/components/ui/separator";
import { QuerySheet } from "./components/QueiesSheet";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";

// const prisma = new PrismaClient();
export default async function Home() {
  const session = await auth();
  const queries: QueryWithCategory[] = await prisma.query.findMany({
    select: {
      id: true,
      name: true,
      description: true,

      category: {
        select: {
          id: true,
          label: true,
          value: true,
        },
      },
    },
  });

  let categories
  if (session?.user) {
    categories = await prisma.queryCategory.findMany({
      include: {
        queries: true,
        roles: true, 
      },
    });
  }
  return (
    <div className="m-auto mt-10 self-center flex rounded-lg ">
      
      {/* Sidebar */}
      <div className="w-48 mr-4 p-2 flex flex-col justify-center">
        <h2 className="font-bold text-center text-lg underline">Menu</h2>
        <Separator className="my-4 w-full" />
        
        {/* {session?.user?.admin && (
          
            <ul className="flex flex-col gap-1 w-2/3">
              <li className="hover:underline text-center">
                <Link href="/admin">
                  Admin
                </Link>
              </li>
            </ul>
        
        )} */}

        <QuerySheet
          categories={categories}
          queries={queries}
          database={process.env.DB_DATABASE as string}
          roles={session?.user?.roles}
        />

      </div>

      {/* Main Landing Page */}
      <Card className="w-full p-2 justify-center flex flex-col h-full">
      <h1 className="text-3xl font-weight-800 mb-5 text-center">
        Welcome {session?.user?.name}
        </h1>
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
      </Card>
      
    </div>
  );
}
