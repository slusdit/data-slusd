"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SchoolInfo } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { updateActiveSchool } from "@/lib/signinMiddleware";

export type SelectableSchool = {
  sc: string;
  name: string;
  logo?: string | null;
};

interface ActiveSchoolProps {
  activeSchool: SchoolInfo;
  /** Schools the user may switch to, resolved server-side in MainHeader. */
  schools?: SelectableSchool[];
  userId?: string;
}

const ActiveSchool = ({ activeSchool, schools, userId }: ActiveSchoolProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const selectableSchools = schools ?? [];
  const hasMultipleSchools = selectableSchools.length > 1;

  const handleSchoolChange = async (schoolSc: string) => {
    if (!userId) return;
    setOpen(false);
    startTransition(async () => {
      try {
        await updateActiveSchool(userId, Number(schoolSc));
        router.refresh();
      } catch (error) {
        console.error("Error updating active school:", error);
        toast.error("Couldn't switch schools. Please try again.");
      }
    });
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
        <span className="text-mainTitle-foreground font-semibold hidden sm:inline">
          {activeSchool.name}
        </span>
      </div>
    );
  }

  // Multiple schools - show dropdown
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-title-foreground/10 transition-colors focus:outline-none"
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
        <span className="text-mainTitle-foreground font-semibold hidden sm:inline max-w-[200px] truncate">
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
              className="rounded-sm"
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
