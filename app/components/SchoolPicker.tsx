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
import { useState, useEffect } from "react";
import { updateActiveSchool } from "@/lib/signinMiddleware";
import Image from "next/image";

type UserSchoolWithDetails = {
  userId: string;
  schoolSc: string;
  school: SchoolInfo;
};

const SchoolPicker = ({
  schools,
  initialSchool = null,
}: {
  schools: UserSchoolWithDetails[];
  initialSchool?: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolInfo | null>(null);

  console.log(initialSchool);
  useEffect(() => {
    if (initialSchool) {
      const initialSelectedSchool =
        schools.find((s) => s.school.sc === initialSchool.toString())?.school ||
        null;
      // console.log(initialSchool)
      // console.log(initialSelectedSchool)
      setSelectedSchool(initialSelectedSchool);
    }
  }, [initialSchool, schools]);

  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm text-white">School: </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-48 justify-start">
            {selectedSchool ? <><Image
                        src={selectedSchool.logo ?? "/logos/slusd-logo.png"}
                        width={20}
                        height={20}
                        alt={selectedSchool.name}
                        className="mr-2"
                      />{selectedSchool.name}</> : <>School Picker</>}
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
                    onSelect={(value) => {
                      const newSelectedSchool =
                        schools.find((s) => s.school.sc === value)?.school ||
                        null;
                      setSelectedSchool(newSelectedSchool);
                      if (newSelectedSchool) {
                        updateActiveSchool(
                          userSchool.userId,
                          Number(newSelectedSchool.sc)
                        );
                      }
                      setOpen(false);
                    }}
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
