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
            <h1>{name}</h1>
            <p>{description}</p>
            <p>{publicQuery ? "Public" : "Private"}</p>
            <p>{createdBy}</p>
            <p>{query}</p>
            <p>{data}</p>
        </div>
    )
}