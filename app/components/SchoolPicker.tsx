"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SchoolInfo } from "@prisma/client";
import { useState, useEffect, useTransition } from "react";
import { updateActiveSchool } from "@/lib/signinMiddleware";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserSchoolWithDetails = {
  userId: string;
  schoolSc: string;
  school: SchoolInfo;
};

const SchoolPicker = ({
  schools,
  initialSchool = null,
  label = null
}: {
  schools: UserSchoolWithDetails[];
    initialSchool?: string | null;
    label?: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolInfo | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (initialSchool && schools.find((s) => s.school.sc === initialSchool.toString())) {
      const initialSelectedSchool = schools.find((s) => s.school.sc === initialSchool.toString())?.school || null;
      setSelectedSchool(initialSelectedSchool);
    }
  }, [initialSchool, schools]);

  const handleSchoolChange = (value: string) => {
    const newSelectedSchool = schools.find((s) => s.school.sc === value)?.school || null;
    if (newSelectedSchool) {
      setSelectedSchool(newSelectedSchool);
      startTransition(async () => {
        try {
          await updateActiveSchool(schools[0].userId, Number(newSelectedSchool.sc));
          router.refresh();
        } catch (error) {
          console.error('Error updating active school:', error);
          // Handle error (e.g., show an error message to the user)
        }
      });
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4 w-full">
      {label && <label className="font-bold text-card-foreground">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-start" disabled={isPending}>
            {selectedSchool ? (
              <>
                <Image
                  src={selectedSchool.logo ?? "/logos/slusd-logo.png"}
                  width={20}
                  height={20}
                  alt={selectedSchool.name}
                  className="mr-2"
                />
                {selectedSchool.name}
              </>
            ) : (
              <>School Picker</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change school..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {schools.map((userSchool) => (
                  <CommandItem
                    key={userSchool.school.sc}
                    value={userSchool.school.sc}
                    onSelect={handleSchoolChange}
                  >
                    <span>
                      <Image
                        src={userSchool.school.logo ?? "/logos/slusd-logo.png"}
                        width={20}
                        height={20}
                        alt={userSchool.school.name}
                        className="mr-2"
                      />
                    </span>
                    <span>{userSchool.school.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};


export default SchoolPicker;
