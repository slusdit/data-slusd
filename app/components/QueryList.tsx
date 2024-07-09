import { auth } from "@/auth";
import { PrismaClient, Query} from "@prisma/client";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";


const prisma = new PrismaClient();
const QueryList = async () => {
    const sesstion = await auth()
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
      let categories;
      if (session?.user) {
        categories = await prisma.queryCategory.findMany(
          {
            include: {
              queries: true,
            },
          },
        );
      }

    return (
        
      <ul className="flex flex-col gap-1 w-2/3">
        {categories && categories.filter((category) => category).map((category) => {
          if (category) {
            return (

              <li key={category.id} className="">
               
                 <span className="text-xl  font-bold">{category.label}</span>

                <ul>
                  {queries
                    .filter((query) => query.category?.value === category.value)
                    .map((query) => (
                      <li
                        key={query.id}
                        className="ml-4 hover:text-primary hover:underline"
                      >
                        <Link
                          href={`/query/${category.value}/${query.id}`}
                          className="hover:underline"
                        >
                          {query.name}
                        </Link>
                      </li>
                    ))}
                </ul>

              </li>
            )
          }
        })}
      </ul>
    )
};

export default QueryList;