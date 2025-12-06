"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu, Star, FolderOpen, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { QueryCategory } from "@prisma/client";
import { QueryWithCategory } from "./QueryBar";
import FormDialog from "./forms/FormDialog";
import AddQueryForm from "./forms/AddQueryForm";
import { Session } from "next-auth";

type FavoriteQuery = {
  id: string;
  name: string;
  description?: string;
  category?: {
    label: string;
    value: string;
  };
};

interface UserWithFavorites {
  favorites: FavoriteQuery[];
  roles: string[];
  email: string;
  queryEdit?: boolean;
}

interface ReportsSidebarProps {
  categories: (QueryCategory & { roles?: { role: string }[] })[];
  queries: QueryWithCategory[];
  user: UserWithFavorites;
  session: Session | null;
}

export default function ReportsSidebar({
  categories,
  queries,
  user,
  session,
}: ReportsSidebarProps) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const userRoles = user.roles || [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* Only show on mobile - desktop uses header dropdown */}
        <Button variant="outline" size="icon" className="fixed left-4 top-20 z-40 shadow-lg md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open reports menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Reports
            </SheetTitle>
            {user?.queryEdit && session && (
              <FormDialog
                triggerMessage=""
                icon={<Plus className="h-4 w-4" />}
                title="Add Query"
              >
                <AddQueryForm session={session} categories={categories} />
              </FormDialog>
            )}
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        <ScrollArea className="h-[calc(100vh-120px)] px-4">
          <Accordion type="multiple" className="w-full" defaultValue={["favorites"]}>
            {/* Favorites Section */}
            {user?.favorites && user.favorites.length > 0 && (
              <AccordionItem value="favorites" className="border-b-0">
                <AccordionTrigger className="hover:no-underline py-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Favorites</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {user.favorites.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <ul className="space-y-1">
                    {user.favorites.map((query) => (
                      <li key={query.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/query/${query.category?.value || query.category?.label?.toLowerCase() || "general"}/${query.id}`}
                              onClick={() => setOpen(false)}
                              className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {query.name}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {query.description || "No description"}
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Category Sections */}
            {categories
              ?.filter((category) => category && category.label !== "Favorites")
              .map((category) => {
                const categoryQueries = queries.filter(
                  (query) => query.category?.value === category.value
                );

                if (categoryQueries.length === 0) return null;

                const categoryRoles: string[] = category.roles?.map((r) => r.role) || [];

                // Check role access
                const hasAccess =
                  userRoles.includes("SUPERADMIN") ||
                  categoryRoles.length === 0 ||
                  userRoles.some((role) => categoryRoles.includes(role));

                if (!hasAccess) return null;

                return (
                  <AccordionItem key={category.id} value={category.value} className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-2">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{category.label}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {categoryQueries.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <ul className="space-y-1">
                        {categoryQueries.map((query) => (
                          <li key={query.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={`/query/${category.value}/${query.id}`}
                                  onClick={() => setOpen(false)}
                                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                  {query.name}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                {query.description || "No description"}
                              </TooltipContent>
                            </Tooltip>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
