"use client";
import { QueryCategory, Session } from "@prisma/client";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

const QueryList = ({
  roles: userRoles,
  queries,
  categories,
}: {
  roles: string[];
  queries: QueryWithCategory[];
  categories: QueryWithCategory[];
}) => {
  let categoryRoles;
  return (
    <ScrollArea className="w-full h-full">
      <ul className="flex flex-col gap-1 w-2/3 mb-8">
        {categories &&
          categories
            .filter((category) => category)
            .map((category) => {
              // Don't render the category if there are no queries in that category
              const categoryQueries = queries.filter(
                (query) => query.category?.value === category.value
              );
              if (categoryQueries.length === 0) {
                return null;
              }
              const categoryRoles: string[] | undefined = category.roles.map(
                (role) => role.role
              );
              console.log("category", category.label);
              console.log("userRoles", userRoles);
              console.log("categoryRoles", categoryRoles);
              console.log('SuperAdmin', userRoles.includes("SUPERADMIN"));
   
              console.log("Entry",
                (categoryRoles &&
                  categoryRoles.length > 0 &&
                  categoryRoles.some((categoryRole) => userRoles.includes(categoryRole))
                )
                
                &&
                  !userRoles.includes("SUPERADMIN")
              );

              // Don't render the category if the user doesn't have any of the roles in that category
              if (
               categoryRoles &&
               categoryRoles?.length < 0                 
              ) {
                console.log("~~~~~~~ Empty Category ~~~~~~~")
                return null;
              }
              
              
              if (
                (
                  categoryRoles &&
                  userRoles.some(role => categoryRoles.includes(role))
                )
                || userRoles.includes("SUPERADMIN")
                || categoryRoles?.length === 0
            
              ) {
              

                return (
                  <li key={category.id} className="">
                    <span className="text-xl  font-bold">{category.label}</span>

                    <ul>
                      {queries
                        .filter(
                          (query) => query.category?.value === category.value
                        )
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
                );
              }
            })}
      </ul>
    </ScrollArea>
  );
};

export default QueryList;
