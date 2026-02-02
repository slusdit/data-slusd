"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Star, FolderClosed, FileText, Search, X } from "lucide-react";
import Link from "next/link";
import { QueryCategory, ROLE } from "@prisma/client";
import { QueryWithCategory } from "./QueryBar";

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
  roles: ROLE[];
  email: string;
  queryEdit?: boolean;
}

interface ReportsDropdownProps {
  categories: (QueryCategory & { roles?: { role: string }[] })[];
  queries: QueryWithCategory[];
  user: UserWithFavorites;
}

export default function ReportsDropdown({
  categories,
  queries,
  user,
}: ReportsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const userRoles = user?.roles || [];
  const userRoleStrings = userRoles.map(r => r.toString());
  const favorites = user?.favorites || [];

  // Filter categories the user has access to
  const accessibleCategories = useMemo(() => {
    if (!user) return [];

    return categories?.filter((category) => {
      if (!category || category.label === "Favorites") return false;

      const categoryRoles: string[] = category.roles?.map((r) => r.role) || [];
      const hasAccess =
        userRoleStrings.includes("SUPERADMIN") ||
        categoryRoles.length === 0 ||
        userRoleStrings.some((role) => categoryRoles.includes(role));

      const categoryQueries = queries.filter(
        (query) => query.category?.value === category.value
      );

      return hasAccess && categoryQueries.length > 0;
    }) || [];
  }, [user, categories, queries, userRoleStrings]);

  // Filter results based on search
  const filteredResults = useMemo(() => {
    const searchLower = search.toLowerCase().trim();

    if (!searchLower) {
      return { favorites, categories: accessibleCategories, isSearching: false };
    }

    const filteredFavorites = favorites.filter((q) =>
      q.name.toLowerCase().includes(searchLower)
    );

    const filteredCategories = accessibleCategories.map((category) => {
      const categoryQueries = queries.filter(
        (query) =>
          query.category?.value === category.value &&
          query.name.toLowerCase().includes(searchLower)
      );
      return { ...category, filteredQueries: categoryQueries };
    }).filter((c) => c.filteredQueries.length > 0);

    return {
      favorites: filteredFavorites,
      categories: filteredCategories,
      isSearching: true
    };
  }, [search, favorites, accessibleCategories, queries]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const handleLinkClick = () => {
    setOpen(false);
    setSearch("");
  };

  if (!user) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="text-mainTitle-foreground hover:bg-title-foreground/10 gap-1"
        >
          <FileText className="h-4 w-4" />
          Reports
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        {/* Search Bar */}
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-8 h-8 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <ScrollArea className="h-80">
          <div className="p-2">
            {/* Favorites Section */}
            {filteredResults.favorites.length > 0 && (
              <Collapsible
                open={filteredResults.isSearching || expandedCategories.has("favorites")}
                onOpenChange={() => toggleCategory("favorites")}
              >
                <CollapsibleTrigger className="flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium hover:bg-accent rounded-md">
                  {(filteredResults.isSearching || expandedCategories.has("favorites")) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Favorites</span>
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {filteredResults.favorites.length}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 space-y-0.5">
                    {filteredResults.favorites.map((query) => (
                      <Link
                        key={query.id}
                        href={`/query/${query.category?.value || query.category?.label?.toLowerCase() || "general"}/${query.id}`}
                        onClick={handleLinkClick}
                        className="block px-2 py-1.5 text-sm rounded-md hover:bg-accent truncate"
                      >
                        {query.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Category Sections */}
            {(filteredResults.isSearching ? filteredResults.categories : accessibleCategories).map((category) => {
              const categoryQueries = filteredResults.isSearching
                ? (category as any).filteredQueries
                : queries.filter((q) => q.category?.value === category.value);

              if (categoryQueries.length === 0) return null;

              const isExpanded = filteredResults.isSearching || expandedCategories.has(category.id);

              return (
                <Collapsible
                  key={category.id}
                  open={isExpanded}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium hover:bg-accent rounded-md">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <FolderClosed className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{category.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {categoryQueries.length}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-6 space-y-0.5">
                      {categoryQueries.map((query: QueryWithCategory) => (
                        <Link
                          key={query.id}
                          href={`/query/${category.value}/${query.id}`}
                          onClick={handleLinkClick}
                          className="block px-2 py-1.5 text-sm rounded-md hover:bg-accent truncate"
                        >
                          {query.name}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {/* No Results */}
            {filteredResults.isSearching &&
              filteredResults.favorites.length === 0 &&
              filteredResults.categories.length === 0 && (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  No reports found for &quot;{search}&quot;
                </div>
              )}

            {/* Empty State */}
            {!filteredResults.isSearching &&
              favorites.length === 0 &&
              accessibleCategories.length === 0 && (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  No reports available
                </div>
              )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
