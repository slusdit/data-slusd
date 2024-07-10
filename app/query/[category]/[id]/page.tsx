import QueryInput from "@/app/components/QueryInput";
import AddQueryForm from "@/app/components/forms/AddQueryForm";
import FormDialog from "@/app/components/forms/FormDialog";
import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { PrismaClient } from "@prisma/client";
import { Plus } from "lucide-react";
import BackButton from "@/app/components/BackButton";
import DataTable from "@/app/components/DataTable";
import BarChart from "@/app/components/charts/BarChart";
import { DiyChartBySchool } from "@/app/components/charts/DiyChartBySchool";
import { QueryWithCategory } from "@/app/components/QueryBar";
import { QuerySheet } from "@/app/components/QueiesSheet";

const prisma = new PrismaClient();
export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = params.id;
  // const categories = await prisma.queryCategory.findMany();
  const result = await prisma.query.findUnique({ where: { id: id } }); //const {id, name, query, description, publicQuery, createdBy }:Query | null = await prisma.query.findUnique({ where: { label: label } })
  let queries: QueryWithCategory[]
  let categories
  if (session?.user) {
    categories = await prisma.queryCategory.findMany(
      {
        include: {
          queries: true,
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
            value: true
          }
        },
      }
    })
  }

  if (result) {
    let data: any[] = await runQuery(result?.query);

    return (
      <div>
        <BackButton />
        <h1 className="text-3xl Underline font-bold">{result.name}</h1>
        
        {(session?.user?.queryEdit) && (
          <FormDialog
            triggerMessage="Add Query"
            icon={<Plus className="py-1" />}
            title="Add Query"
          >
            <AddQueryForm
              session={session}
              pageValues={result}
              categories={categories}
            />
          </FormDialog>
        )}
        <br></br>
        <div className="my-2">

        <QuerySheet categories={categories} queries={queries}/>
        </div>
        <label htmlFor="description">Description:</label>
        <div id="description">{result.description}</div>
        <p>Public/Private: {result.publicQuery ? "Public" : "Private"}</p>
        <p>
          Created By:{" "}
          <a
            className="hover:underline text-primary"
            href={`mailto:${result.createdBy}`}
          >
            {result.createdBy}{" "}
          </a>
        </p>
        

        
        {/* <DataTable columns={columns} data={data} /> */}
       
        {/* {id === "cly54bp030001hv31khj4zt38" &&
        <DiyChartByGrade chartData={data} />} */}
        
        {session?.user?.queryEdit ? (
          <>
          
          
          <QueryInput 
            initialValue={result?.query} 
            initialResult={data} 
            showChart={result.chart} 
            chartTitle={result?.name}
            />
          </>
        ) : (
          <>

            <h2 className="text-xl underline font-bold mt-2 w-full">Data:</h2>
            
              <DataTable data={data} showChart={result.chart}/>
            
          </>
        )}
      </div>
    );
  } else {
    return <div>No results found</div>;
  }
}
