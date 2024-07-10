'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from "next/link"
import { QueryCategory } from "@prisma/client"
import { Menu } from "lucide-react"

export function QuerySheet({

    categories,
    queries 

  }:{

    categories: QueryCategory[],
    queries: any[]
    
}) {

  console.log(queries, categories)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}><Menu className="mr-2 h-4 w-4"/>Queries</Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Queries</SheetTitle>
          <SheetDescription>
            Please pick from the list below
          </SheetDescription>
        </SheetHeader>
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
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"destructive"}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
