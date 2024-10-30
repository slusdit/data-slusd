"use client";
// import { QueryCategory, Session, User } from "@prisma/client";
import { User } from "@prisma/client";
import Link from "next/link";
import { QueryWithCategory } from "./QueryBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { createFactory } from "react";


const QueryList = ({
  roles: userRoles,
  queries,
  categories,
  email,
  user,
  defaultExpandedAccordion,
  accordion = false
}: {
  roles: string[];
  queries: QueryWithCategory[];
  categories: QueryWithCategory[];
  email: string;
  user: User;
  defaultExpandedAccordion?: string;
  accordion?: boolean
}) => {

  console.log(categories)
  if (accordion) {
    return (
      <ScrollArea className="w-full max-h-1/2 ">
        <Accordion type="multiple" collapseable className="flex flex-col gap-1 w-full mb-8 " defaultValue={defaultExpandedAccordion}>
          {categories &&
            categories
              .filter((category) => category)
              .map((category) => {
                console.log(category.label)
                // Don't render the category if there are no queries in that category
                let queriesWithCategories = queries.filter(
                  (query) => {
                    if (category.label.toLowerCase() === "favorites") {
                      return user.favorites.includes(query.id)
                      
                    }
         

                    return (
                      query.category?.value === category.value
                      // && (query.publicQuery === true || query.createdBy === user.email)
                      // || query.publicQuery === true 
                      // || query.createdBy === user.email
                    )
                  }
                )

                if (queriesWithCategories.length === 0) {
                  console.log(category.label)
                  return null;
                }
                const categoryRoles: string[] | undefined = category.roles.map(
                  (role) => role.role
                );
                // console.log(defaultExpandedAccordion)
                // console.log("category", category.label);
                // console.log("userRoles", userRoles);
                // console.log("categoryRoles", categoryRoles);
                // console.log('SuperAdmin', userRoles.includes("SUPERADMIN"));

                // Don't render the category if the user doesn't have any of the roles in that category
                if (
                  categoryRoles &&
                  categoryRoles?.length < 0
                ) {
                  // console.log("~~~~~~~ Empty Category ~~~~~~~")
                  return null;
                }

                if (
                  (
                    categoryRoles &&
                    user.roles.some(role => categoryRoles.includes(role))
                  )
                  || user.roles.includes("SUPERADMIN")
                  || categoryRoles?.length === 0
                  || category.label.toLowerCase() === 'favorites'
                  


                ) {
                  console.log(category.label)
                  console.log(category.value === 'favorites' )  
                  const defaultExpandedStyle = (defaultExpandedAccordion && defaultExpandedAccordion === category.value) ? "bg-primary/80 text-primary-foreground" : "even:bg-secondary/10 "
                  console.log(defaultExpandedStyle)
                  return (

                    <AccordionItem key={category.id} className='' value={category.value} >

                      <AccordionTrigger className={`${defaultExpandedStyle} text-xl font-bold pr-4`}>
                        <div className="flex-grow text-left ml-4">

                          {category.label}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className='mr-0 pr-0'>
                          {queries
                            .filter(
                              (query) => (query.category?.value === category.value
                                // && query.publicQuery === true 
                              )
                            )
                            .map((query) => (
                              <Tooltip>

                              <li
                                key={query.id}
                                className="ml-4 p-2 pr-0 mr-0  text-foreground even:bg-card odd:bg-background hover:text-primary  hover:underline"
                                >
                                <TooltipTrigger asChild>
                                  <Link
                                    href={`/query/${category.value}/${query.id}`}
                                    className=""
                                    >
                                    {query.name}
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>{query.description}</TooltipContent>
                              </li>
                                    </Tooltip>

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
              // console.log("category", category.label);
              // console.log("userRoles", userRoles);
              // console.log("categoryRoles", categoryRoles);
              // console.log('SuperAdmin', userRoles.includes("SUPERADMIN"));

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
                          <Tooltip>

                              <li
                                key={query.id}
                                className="ml-4 p-2 rounded-br-lg even:bg-card hover:text-primary  hover:underline"
                                >
                                <TooltipTrigger asChild>
                                  <Link
                                    href={`/query/${category.value}/${query.id}`}
                                    className=""
                                    >
                                    {query.name}
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>{query.description}</TooltipContent>
                              </li>
                                    </Tooltip>

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
