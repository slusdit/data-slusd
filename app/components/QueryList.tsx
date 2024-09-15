"use client";
import { QueryCategory, Session, User } from "@prisma/client";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const QueryList = ({
  roles: userRoles,
  queries,
  categories,
  email,
  user,
  accordion = false
}: {
  roles: string[];
  queries: QueryWithCategory[];
  categories: QueryWithCategory[];
  email: string;
  user: User;
  accordion?: boolean
}) => {
  if (accordion) {
    return (
      <ScrollArea className="w-full max-h-1/2 ">
        <Accordion type="multiple" collapsible className="flex flex-col gap-1 w-full mb-8 ">
          {categories &&
            categories
              .filter((category) => category)
              .map((category) => {
                // Don't render the category if there are no queries in that category
                const queriesWithCategories = queries.filter(
                  (query) => {
             
                    return (
                      query.category?.value === category.value
                      // && (query.publicQuery === true || query.createdBy === user.email)
                      // || query.publicQuery === true 
                      // || query.createdBy === user.email
                    )
                  }
                );
                if (queriesWithCategories.length === 0) {
                  return null;
                }
                const categoryRoles: string[] | undefined = category.roles.map(
                  (role) => role.role
                );
                console.log("category", category.label);
                console.log("userRoles", userRoles);
                console.log("categoryRoles", categoryRoles);
                console.log('SuperAdmin', userRoles.includes("SUPERADMIN"));

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
                    user.roles.some(role => categoryRoles.includes(role))
                  )
                  || user.roles.includes("SUPERADMIN")
                  || categoryRoles?.length === 0


                ) {


                  return (

                    <AccordionItem key={category.id} className="even:bg-secondary/10 " value={category.id}>

                      <AccordionTrigger className="text-xl font-bold">
                        <div className="flex-grow text-left ml-4">

                        {category.label}
                        </div>
                        </AccordionTrigger>
                      <AccordionContent>
                        <ul>
                          {queries
                            .filter(
                              (query) => (query.category?.value === category.value
                                // && query.publicQuery === true 
                              )
                            )
                            .map((query) => (
                              <li
                                key={query.id}
                                className="ml-4 p-2 rounded-br-lg even:bg-card hover:text-primary  hover:underline"
                              >
                                <Link
                                  href={`/query/${category.value}/${query.id}`}
                                  className=""
                                >
                                  {query.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
              })}
        </Accordion>
      </ScrollArea>
    );
  }
  return (
    <ScrollArea className="w-full h-full">
      <ul className="flex flex-col gap-1 w-2/3 mb-8">
        {categories &&
          categories
            .filter((category) => category)
            .map((category) => {
              // Don't render the category if there are no queries in that category
              const queriesWithCategories = queries.filter(
                (query) => {
                  console.log(query?.publicQuery === true || query.createdBy === user.email)
                  console.log(query.category?.value === category.value
                    // && (query.publicQuery === true || query.createdBy === user.email)
                    || query.publicQuery === true
                    || query.createdBy === user.email, query.name)
                  // && (query.publicQuery === true || query.createdBy === user.email)
                  // || query.publicQuery === true 
                  // || query.createdBy === user.email
                  console.log(query)
                  return (
                    query.category?.value === category.value
                    // && (query.publicQuery === true || query.createdBy === user.email)
                    // || query.publicQuery === true 
                    // || query.createdBy === user.email
                  )
                }
              );
              if (queriesWithCategories.length === 0) {
                return null;
              }
              const categoryRoles: string[] | undefined = category.roles.map(
                (role) => role.role
              );
              console.log("category", category.label);
              console.log("userRoles", userRoles);
              console.log("categoryRoles", categoryRoles);
              console.log('SuperAdmin', userRoles.includes("SUPERADMIN"));

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
                  user.roles.some(role => categoryRoles.includes(role))
                )
                || user.roles.includes("SUPERADMIN")
                || categoryRoles?.length === 0


              ) {


                return (

                  <li key={category.id} className="">

                    <span className="text-xl  font-bold">{category.label}</span>

                    <ul>
                      {queries
                        .filter(
                          (query) => (query.category?.value === category.value
                            // && query.publicQuery === true 
                          )
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
