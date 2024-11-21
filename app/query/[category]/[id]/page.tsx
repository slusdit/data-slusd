import AddQueryForm from "@/app/components/forms/AddQueryForm";
import FormDialog from "@/app/components/forms/FormDialog";
import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft, Home, Plus } from "lucide-react";
import { QueryWithCategory } from "@/app/components/QueryBar";
import { QuerySheet } from "@/app/components/QueiesSheet";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DataTableAgGrid from "@/app/components/DataTableAgGrid";
import FavoriteQuerySwitch from "@/app/components/FavoriteQuerySwitch";

export default async function Page({ params }: { params: { id: string, category: string } }) {
  const session = await auth();
  const id = params.id;
  let urlCategory = params.category.split('%20')[0];
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
        hiddenCols: true,
        chartTypeKey: true,
        chartXKey: true,
        chartYKey: true,

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

  if (result) {
    let data: any[] = await runQuery(result?.query);
    const category = result
    function getHiddenColumns(hiddenCols: string): string[] | undefined {

      if (!hiddenCols) {
        return []
      }
      return hiddenCols.split(',').map((col) => col.trim().toUpperCase());

    }

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
            
              <FavoriteQuerySwitch queryId={id} user={session?.user} />
            
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
             

            </div>
            <label htmlFor="description">Description:</label>
            <div id="description">{result.description}</div>
          </div>

          <h2 className="text-xl underline font-bold mt-2 w-full">Data:</h2>
          <DataTableAgGrid
            data={data}
            id={id}
            showChart={result.chart}
            chartTitle={result?.name}
            chartXKey={result?.chartXKey}
            chartYKey={result?.chartYKey}
            chartTypeKey={result?.chartTypeKey}
            chartStackKey={result?.chartStackKey}
            hiddenColumns={getHiddenColumns(result?.hiddenCols)}
            title={result.name} />

        </div>
      </div>
    );
  } else {
    return <div>No results found</div>;
  }
}
