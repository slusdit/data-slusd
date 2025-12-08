"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SchoolInfo } from "@prisma/client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { updateActiveSchool } from "@/lib/signinMiddleware";

type UserSchool = {
  school: {
    sc: string;
    name: string;
    logo?: string;
  };
};

interface ActiveSchoolProps {
  activeSchool: SchoolInfo;
  userSchools?: UserSchool[];
  allowedSchoolCodes?: string[]; // Filtered list of school codes the user actually has access to
  userId?: string;
}

const ActiveSchool = ({ activeSchool, userSchools, allowedSchoolCodes, userId }: ActiveSchoolProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // Filter schools to only show those the user has access to
  const filteredSchools = userSchools?.filter(us => {
    // If no allowedSchoolCodes provided, show all
    if (!allowedSchoolCodes || allowedSchoolCodes.length === 0) return true;
    return allowedSchoolCodes.includes(us.school.sc);
  }) || [];

  const hasMultipleSchools = filteredSchools.length > 1;

  const handleSchoolChange = async (schoolSc: string) => {
    if (!userId) return;
    setOpen(false);
    startTransition(async () => {
      try {
        await updateActiveSchool(userId, Number(schoolSc));
        router.refresh();
      } catch (error) {
        console.error("Error updating active school:", error);
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
      <DropdownMenuContent align="center" className="w-64">
        {filteredSchools.map((userSchool) => (
          <DropdownMenuItem
            key={userSchool.school.sc}
            onClick={() => handleSchoolChange(userSchool.school.sc)}
            className="gap-3 py-2.5"
          >
            <Image
              src={userSchool.school.logo || "/logos/slusd-logo.png"}
              width={28}
              height={28}
              alt={userSchool.school.name}
              className="rounded-sm"
            />
            <span className="flex-1 truncate">{userSchool.school.name}</span>
            {userSchool.school.sc === activeSchool.sc && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActiveSchool;
