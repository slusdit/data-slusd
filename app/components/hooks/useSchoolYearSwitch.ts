"use client";

/**
 * One way to switch the active school or database year (finding U4): call the
 * server action, refresh the route so every server component re-reads the
 * session, and toast on failure. Used by ActiveSchool, YearSelector and the
 * profile page so the refresh strategy no longer differs per caller.
 */
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateActiveDbYear, updateActiveSchool } from "@/lib/signinMiddleware";

export function useSchoolYearSwitch(userId?: string) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const run = (work: () => Promise<void>, failureMessage: string) => {
    if (!userId) return;
    startTransition(async () => {
      try {
        await work();
        router.refresh();
      } catch (error) {
        console.error(failureMessage, error);
        toast.error(failureMessage);
      }
    });
  };

  return {
    isPending,
    switchSchool: (sc: number | string) =>
      run(() => updateActiveSchool(userId!, Number(sc)), "Couldn't switch schools. Please try again."),
    switchYear: (year: number) =>
      run(() => updateActiveDbYear(userId!, year), "Couldn't change the school year. Please try again."),
  };
}
