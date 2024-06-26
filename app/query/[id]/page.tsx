import QueryInput from "@/app/components/QueryInput";
import AddQueryForm from "@/app/components/forms/AddQueryForm";
import FormDialog from "@/app/components/forms/FormDialog";
import { auth } from "@/auth";
import { Input } from "@/components/ui/input";
import { runQuery } from "@/lib/aeries";
import { PrismaClient } from "@prisma/client";
import { Query } from "@prisma/client";
import { Plus } from "lucide-react";

const prisma = new PrismaClient();
export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = params.id;
  const result = await prisma.query.findUnique({ where: { id: id } }); //const {id, name, query, description, publicQuery, createdBy }:Query | null = await prisma.query.findUnique({ where: { label: label } })
  console.log(result);
  if (result) {
    const data = await runQuery(result?.query);
    // console.log(data)

    return (
      <div>
        
        <h1 className="text-3xl Underline font-bold">{result.name}</h1>
        <FormDialog triggerMessage="Add Query" icon={<Plus className="py-1" />} title="Add Query" >
          <AddQueryForm session={session} query={result.query}  />
        </FormDialog>
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
        
        {session?.user?.queryEdit ? (
          <QueryInput  pageValues={result} initialResult={data} />
        ) : (
          <>
            <label htmlFor="query" >Query: </label>
            <code id="query" className="border bg-card p-2 ">{result.query}</code>

            <h2 className="text-xl underline font-bold mt-2">Data:</h2>
            <ul>
              {data?.map((row) => (
                <li key={result.id}>{JSON.stringify(row, null, 2)}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  } else {
    return <div>No results found</div>;
  }
}
