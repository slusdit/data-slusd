import QueryInput from "@/app/components/QueryInput";
import AddQueryForm from "@/app/components/forms/AddQueryForm";
import FormDialog from "@/app/components/forms/FormDialog";
import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft, Home, Plus } from "lucide-react";
import BackButton from "@/app/components/BackButton";
import DataTable from "@/app/components/DataTable";
import BarChart from "@/app/components/charts/BarChart";
import { DiyChartBySchool } from "@/app/components/charts/DiyChartBySchool";
import { QueryWithCategory } from "@/app/components/QueryBar";
import { QuerySheet } from "@/app/components/QueiesSheet";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";

// const prisma = new PrismaClient();
export default async function Page({ params }: { params: { id: string, category: string } }) {
  const session = await auth();
  const id = params.id;
  const urlCategory = params.category;
  // const categories = await prisma.queryCategory.findMany();
  const result = await prisma.query.findUnique({ where: { id: id } }); //const {id, name, query, description, publicQuery, createdBy }:Query | null = await prisma.query.findUnique({ where: { label: label } })
  let queries: QueryWithCategory[]
  let categories
  if (session?.user) {
    categories = await prisma.queryCategory.findMany(
      {
        include: {
          queries: true,
          roles: true,
        },
      },
    );

    queries = await prisma.query.findMany({
      select: {

        id: true,
        name: true,
        description: true,

        category: {
          select: {
            id: true,
            label: true,
            value: true,

          }
        },
      }
    })
  }

  // const renderChart = (table) => {
  //   return <DiyChartBySchool table={table} />;
  // };
  console.log(urlCategory)
  if (result) {
    let data: any[] = await runQuery(result?.query);
    const category = result
    return (
      <div >
        {/* <Sidebar session={session} categories={categories} queries={queries} /> */}
        <div className="flex flex-col w-full items-center">
          <div className="items-left w-full">

            {/* <BackButton /> */}
            <Button
              variant={"link"}>
              <Link
                href="/"
                className="hover:underline text-primary flex"
              ><ArrowLeft className="h-4 w-4 mr-2 text-primary " />Home</Link>

            </Button>
            <h1 className="text-3xl text-left  font-bold">{result.name}</h1>


            <br></br>
            <div className="my-2">

              <QuerySheet
                categories={categories}
                queries={queries}
                database={process.env.DB_DATABASE as string}
                roles={session?.user?.roles}
                user={session?.user}
                accordion
                defaultExpandedAccordion={urlCategory}
              />
              {session?.user?.queryEdit ?? (
                <FormDialog
                  triggerMessage="Add Query"
                  icon={<Plus className="py-1" />}
                  title="Add Query"

                >
                  <AddQueryForm session={session} categories={categories} pageValues={result} />
                </FormDialog>
              )}

            </div>
            <label htmlFor="description">Description:</label>
            <div id="description">{result.description}</div>
          </div>
          {/* <p>Public/Private: {result.publicQuery ? "Public" : "Private"}</p>
        <p>
          Created By:{" "}
          <a
            className="hover:underline text-primary"
            href={`mailto:${result.createdBy}`}
          >
            {result.createdBy}{" "}
          </a>
        </p> */}



          {/* <DataTable columns={columns} data={data} /> */}

          {/* {id === "cly54bp030001hv31khj4zt38" &&
        <DiyChartByGrade chartData={data} />} */}

          {session?.user?.queryEdit ? (
            <div className="w-full">


              <QueryInput
                initialValue={result?.query}
                initialResult={data}
                showChart={result.chart}
                chartTitle={result?.name}
                id={id}
              />
            </div>
          ) : (
            <>

              <h2 className="text-xl underline font-bold mt-2 w-full">Data:</h2>

              <DataTable
                data={data}
                id={id}
                showChart={result.chart}
                chartTitle={result?.name}
                chartValueKey={result?.chartValueKey}
                chartColumnKey={result?.chartColumnKey}
              />

            </>
          )}
        </div>
      </div>
    );
  } else {
    return <div>No results found</div>;
  }
}
