"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Settings, Calendar, Check } from "lucide-react";
import { toast } from "sonner";

// Import from shared module
import { AVAILABLE_DB_YEARS } from '@/lib/schoolYear';

interface AdminSettingsPanelProps {
  currentDefaultYear: number;
  calculatedYear: number;
  userId: string;
  onUpdateDefaultYear: (year: number, userId: string) => Promise<void>;
}

export default function AdminSettingsPanel({
  currentDefaultYear,
  calculatedYear,
  userId,
  onUpdateDefaultYear,
}: AdminSettingsPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedYear, setSelectedYear] = useState<number>(currentDefaultYear);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await onUpdateDefaultYear(selectedYear, userId);
        toast.success("Default year updated successfully");
        router.refresh();
      } catch (error) {
        console.error("Error updating default year:", error);
        toast.error("Failed to update default year");
      }
    });
  };

  const hasChanges = selectedYear !== currentDefaultYear;
  const isUsingCalculated = currentDefaultYear === calculatedYear;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          System Settings
        </CardTitle>
        <CardDescription>
          Configure application-wide settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Default Database Year Setting */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="defaultYear" className="text-base font-medium">
              Default Database Year
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            The default school year database that new users and users without a preference will query.
            The system calculates the current school year as <strong>{AVAILABLE_DB_YEARS.find(y => y.year === calculatedYear)?.label}</strong> based on today&apos;s date.
          </p>
          <div className="flex items-center gap-4">
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value, 10))}
              disabled={isPending}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_DB_YEARS.map((yearInfo) => (
                  <SelectItem key={yearInfo.year} value={yearInfo.year.toString()}>
                    <span className="flex items-center gap-2">
                      {yearInfo.label}
                      {yearInfo.year === calculatedYear && (
                        <span className="text-xs text-muted-foreground">(calculated)</span>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleSave}
              disabled={isPending || !hasChanges}
              size="sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
          {!isUsingCalculated && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Override active: Using {AVAILABLE_DB_YEARS.find(y => y.year === currentDefaultYear)?.label} instead of calculated {AVAILABLE_DB_YEARS.find(y => y.year === calculatedYear)?.label}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
