"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { QueryCategory, Session, User } from "@prisma/client";
import { Menu } from "lucide-react";
import QueryList from "./QueryList";

export function QuerySheet({
  categories,
  queries,
  database,
  roles,
  user,
  defaultExpandedAccordion,
  accordion = false,

}: {
  categories: QueryCategory[];
  queries: any[];
  database: string;
  roles: string[];
  user: User;
  defaultExpandedAccordion?: string;
  accordion?: boolean;
}) {
 
  const dbSchoolYear = `20${database.slice(3, 5)} - 20${Number(database.slice(3, 5)) + 1}`;
  // console.log(user)
  // console.log(defaultExpandedAccordion)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu className="mr-2 h-4 w-4" />
          Reports
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Reports</SheetTitle>
          <SheetDescription>{dbSchoolYear} School Year</SheetDescription>
        </SheetHeader>
        <QueryList
          queries={queries}
          categories={categories}
          roles={roles}
          email={user?.email}
          user={user}
          defaultExpandedAccordion={defaultExpandedAccordion}          
          accordion
        />
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"ghost"}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
