"use client";

import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useSchoolYearSwitch } from "./hooks/useSchoolYearSwitch";

export type SelectableSchool = {
  sc: string;
  name: string;
  logo?: string | null;
};

interface ActiveSchoolProps {
  activeSchool: { sc: string; name: string; logo?: string | null };
  /** Schools the user may switch to, resolved server-side from user.schools. */
  schools?: SelectableSchool[];
  userId?: string;
  /** Larger, labelled variant for the profile page */
  variant?: "header" | "card";
}

const ActiveSchool = ({ activeSchool, schools, userId, variant = "header" }: ActiveSchoolProps) => {
  const [open, setOpen] = useState(false);
  const { isPending, switchSchool } = useSchoolYearSwitch(userId);

  const selectableSchools = schools ?? [];
  const hasMultipleSchools = selectableSchools.length > 1;
  const textClass = variant === "card" ? "font-semibold" : "text-mainTitle-foreground font-semibold";

  const handleSchoolChange = (schoolSc: string) => {
    setOpen(false);
    switchSchool(schoolSc);
  };

  // If user only has one school, show static display
  if (!hasMultipleSchools) {
    return (
      <div className="flex items-center gap-2">
        <Image
          src={activeSchool.logo ?? "/logos/slusd-logo.png"}
          width={40}
          height={40}
          alt="School Logo"
          className="rounded-md"
        />
        <span className={`${textClass} ${variant === "header" ? "hidden sm:inline" : ""}`}>
          {activeSchool.name}
        </span>
      </div>
    );
  }

  // Multiple schools - show dropdown
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={
          variant === "card"
            ? "flex w-full items-center gap-3 rounded-lg border px-3 py-2 hover:bg-muted transition-colors focus:outline-hidden"
            : "flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-title-foreground/10 transition-colors focus:outline-hidden"
        }
        disabled={isPending}
        aria-label={`Active school: ${activeSchool.name}. Change school`}
      >
        {isPending ? (
          <Loader2 className="h-8 w-8 animate-spin text-title-foreground/70" />
        ) : (
          <Image
            src={activeSchool.logo ?? "/logos/slusd-logo.png"}
            width={40}
            height={40}
            alt="School Logo"
            className="rounded-md"
          />
        )}
        <span className={`${textClass} ${variant === "header" ? "hidden sm:inline" : "flex-1 text-left"} max-w-[200px] truncate`}>
          {activeSchool.name}
        </span>
        <ChevronDown className={`h-4 w-4 text-title-foreground/70 transition-transform ${open ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64 max-h-[70vh] overflow-y-auto">
        {selectableSchools.map((school) => (
          <DropdownMenuItem
            key={school.sc}
            onClick={() => handleSchoolChange(school.sc)}
            className="gap-3 py-2.5"
          >
            <Image
              src={school.logo || "/logos/slusd-logo.png"}
              width={28}
              height={28}
              alt={school.name}
              className="rounded-xs"
            />
            <span className="flex-1 truncate">{school.name}</span>
            {school.sc === activeSchool.sc && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActiveSchool;
