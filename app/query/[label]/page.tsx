import { runQuery } from "@/lib/aeries"
import { PrismaClient } from "@prisma/client"
import { Query } from "@prisma/client"


const prisma = new PrismaClient()
export default async function Page({ params }: { params: { label: string } }) {
    const label = params.label
    const result = await prisma.query.findUnique({ where: { label: label } }) //const {id, name, query, description, publicQuery, createdBy }:Query | null = await prisma.query.findUnique({ where: { label: label } })

    if (result) {


        const data = runQuery(result?.query)
        console.log(data)

        return (
            <div>
                <h1 className="text-3xl Underline font-bold">{result.name}</h1>
                <label htmlFor="description">Description:</label>
                <div id='description'>{result.description}</div>
                <p>Public/Private: {result.publicQuery ? "Public" : "Private"}</p>
                <p>Created By: <a className="hover:underline text-primary" href={`mailto:${result.createdBy}`}>{result.createdBy} </a></p>
                <label htmlFor="query">Query:</label>
                <br />
                <code id="query" className="text-sm border bg-card p-2">{result.query}</code>
                <h2 className="text-xl underline font-bold mt-2">Data:</h2>
                <ul>{(await data).map((row) => <li key={result.id}>{JSON.stringify(row, null, 2)}</li>)}</ul>
            </div>
        )
    } else {
        return <div>No results found</div>
    }
}