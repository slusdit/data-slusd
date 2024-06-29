import adminCheck from "@/lib/adminCheck"
import QueryBar from "../components/QueryBar"
import { PrismaClient } from "@prisma/client"
import { QueryWithCategory } from "../components/NavMenuDemo"

const prisma = new PrismaClient()
export default async function AdminPage() {
    const admin = await adminCheck()

    const queries: QueryWithCategory[] = await prisma.query.findMany({
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

    if (!admin) {
        return (
            <div className="">
                Not an Admin
            </div>
        )
    }

    return (
        <div>
            <h1>Admin</h1>
            <QueryBar queries={queries}/>
        </div>
    )
}