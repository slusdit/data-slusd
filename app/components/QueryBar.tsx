'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Query, QueryCategory } from "@prisma/client"
import React from "react"

export type QueryWithCategory = Query & {
  category: QueryCategory | null
}

const QueryBar = ({ queries }: { queries: QueryWithCategory[] }) => {
  console.log(queries)
  const queryCategories = Array.from(
    new Set(queries.map((query) => query.category?.label))
  )

  return (
    <NavigationMenu>
      <NavigationMenuList className="w-full">
        {queryCategories.map((category, index) => {
          console.log(category)

          // if (!category) return null
          return (

            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
              <NavigationMenuContent className="w-full">
                <ul className="grid m-auto gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {queries
                    .filter((query) => query.category?.label === category)
                    .map((query) => (
                      <ListItem
                        key={query.id}
                        title={query.name}
                        href={`/query/${query.id}`}
                      >
                        {query.description}
                      </ListItem>
                    ))}

                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )


        })}
      </NavigationMenuList>
    </NavigationMenu>

  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default QueryBar