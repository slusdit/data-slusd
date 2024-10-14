import adminCheck from "@/lib/adminCheck"
import BackButton from "@/app/components/BackButton"
import QueryBar, { QueryWithCategory } from "../components/QueryBar"
import { PrismaClient } from "@prisma/client"
import AddClassToUserButton from "../components/AddClassToUserButton"
import QueryList from "../components/QueryList"
import QueryAdminGrid from "../components/QueryAdminGrid"
import { toast } from "sonner"

const prisma = new PrismaClient()
export default async function AdminPage() {
    const admin = await adminCheck()

    const queries: QueryWithCategory[] = await prisma.query.findMany({
        select: {
          
            id: true,
            name: true,
            description: true,
            publicQuery: true,
            createdBy: true,
            query: true,
            chart: true,
            chartColumnKey: true,
            chartValueKey: true,
            hiddenCols: true,
            categoryId: true,

          
          category: {
            select: {
              id: true,
              label: true,
              // value: true
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
            <BackButton />
            <h1>Admin</h1>
            {/* <QueryBar queries={queries}/>
            <AddClassToUserButton /> */}
            {/* <pre>{JSON.stringify(queries, null, 2)}</pre> */}
            <QueryAdminGrid 
              dataIn={queries} 
              />
        </div>
    )
}