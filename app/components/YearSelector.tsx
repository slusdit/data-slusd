"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Loader2, Calendar } from "lucide-react";
import { updateActiveDbYear } from "@/lib/signinMiddleware";

// Available database years - imported from shared module
import { AVAILABLE_DB_YEARS } from '@/lib/schoolYear';

interface YearSelectorProps {
  activeDbYear: number;
  userId?: string;
}

const YearSelector = ({ activeDbYear, userId }: YearSelectorProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const currentYearInfo = AVAILABLE_DB_YEARS.find(y => y.year === activeDbYear) || AVAILABLE_DB_YEARS[0];

  const handleYearChange = async (year: number) => {
    if (!userId) return;
    setOpen(false);
    startTransition(async () => {
      try {
        await updateActiveDbYear(userId, year);
        router.refresh();
      } catch (error) {
        console.error("Error updating active database year:", error);
      }
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-title-foreground/10 transition-colors focus:outline-none text-sm"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-mainTitle-foreground" />
        ) : (
          <Calendar className="h-4 w-4 text-mainTitle-foreground" />
        )}
        <span className="text-mainTitle-foreground font-medium">
          {currentYearInfo.label}
        </span>
        <ChevronDown className={`h-3 w-3 text-mainTitle-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-32">
        {AVAILABLE_DB_YEARS.map((yearInfo) => (
          <DropdownMenuItem
            key={yearInfo.year}
            onClick={() => handleYearChange(yearInfo.year)}
            className="gap-2 py-2"
          >
            <span className="flex-1">{yearInfo.label}</span>
            {yearInfo.year === activeDbYear && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default YearSelector;
