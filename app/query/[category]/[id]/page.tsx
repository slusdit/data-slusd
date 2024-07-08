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

const prisma = new PrismaClient();
export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = params.id;
  const categories = await prisma.queryCategory.findMany();
  const result = await prisma.query.findUnique({ where: { id: id } }); //const {id, name, query, description, publicQuery, createdBy }:Query | null = await prisma.query.findUnique({ where: { label: label } })
  const showChart = id === "cly54bp030001hv31khj4zt38" ? true : false;
  

  if (result) {
    let data: any[] = await runQuery(result?.query);
    console.log(showChart)
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
            showChart={showChart} 
            chartTitle={result?.name}
            />
          </>
        ) : (
          <>

            <h2 className="text-xl underline font-bold mt-2 w-full">Data:</h2>
            
              <DataTable data={data} showChart={showChart}/>
            
          </>
        )}
      </div>
    );
  } else {
    return <div>No results found</div>;
  }
}
