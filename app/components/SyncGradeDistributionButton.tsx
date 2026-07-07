'use client';

import { Button } from "@/components/ui/button";
import { aggregateTeacherGradeSummaries, syncGradeDistribution } from "@/lib/syncGradeDistribution";
import { useState } from "react";
import { toast } from "sonner";

const SyncGradeDistributionButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFullSync = async () => {
        setIsLoading(true);
        try {
            await syncGradeDistribution();
            toast.success("Grade distribution imported successfully.");
        } catch (error) {
            console.error("Grade sync failed:", error);
            toast.error(
                error instanceof Error
                    ? `Import failed: ${error.message}`
                    : "Grade import failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleSummarySync = async () => {
        setIsLoading(true);
        try {
            // await syncGradeDistribution();  // Uncomment if you want to include this function
            await aggregateTeacherGradeSummaries({ellStatus: 'English Only'});
            console.log("Syncing grades...");
        } finally {
            setIsLoading(false);
        }
    };
    const handleSummarySyncReset = async () => {
        setIsLoading(true);
        try {
            // await syncGradeDistribution();  // Uncomment if you want to include this function
            await aggregateTeacherGradeSummaries({});
            console.log("Syncing grades...");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                onClick={handleFullSync}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Import Grades"}
            </Button>
            {/* <Button
                onClick={handleSummarySync}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Sync Summary"}
            </Button> */}
            {/* <Button
                onClick={handleSummarySyncReset}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Recalculate Summary"}
            </Button> */}
        </div>
    );
};

export default SyncGradeDistributionButton;