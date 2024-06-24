import { runQuery } from "@/lib/aeries"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
export default async function Page({ params }: { params: { label: string } }) {
    const label = params.label
    const {id, name, query, description, publicQuery, createdBy } = await prisma.query.findUnique({ where: { label: label } })

    console.log({id, label, name, query, description, publicQuery, createdBy })
    
    const data = runQuery(query)
    console.log(data)
    
    return (
        <div>
            <h1 className="text-3xl Underline font-bold">{name}</h1>
            <label htmlFor="description">Description:</label>
            <div id='description'>{description}</div>
            <p>Public/Private: {publicQuery ? "Public" : "Private"}</p>
            <p>Created By: <a className="hover:underline text-primary" href={`mailto:${createdBy}`}>{createdBy} </a></p>
            <label htmlFor="query">Query:</label>
            <br />
            <code id="query" className="text-sm border bg-card p-2">{query}</code>
            <h2 className="text-xl underline font-bold mt-2">Data:</h2>
            <ul>{(await data).map((row) => <li>{JSON.stringify(row, null, 2)}</li>)}</ul>
        </div>
    )
}