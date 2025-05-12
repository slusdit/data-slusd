'use client';

import { Button } from "@/components/ui/button";
import { aggregateTeacherGradeSummaries, syncGradeDistribution } from "@/lib/syncGradeDistribution";
import { useState } from "react";

const SyncGradeDistributionButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFullSync = async () => {
        setIsLoading(true);
        try {
            await syncGradeDistribution();
            console.log("Syncing grades completed");
        } catch (error) {
            console.error("Error syncing grade data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSummarySync = async () => {
        setIsLoading(true);
        try {
            const newData = await aggregateTeacherGradeSummaries({});
            console.log("Aggregated grade summaries");
        } catch (error) {
            console.error("Error aggregating grade summaries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                onClick={handleFullSync}
                disabled={isLoading}
                variant="outline"
            >
                {isLoading ? "Loading..." : "Sync All Grade Data"}
            </Button>
            <Button
                onClick={handleSummarySync}
                disabled={isLoading}
                variant="default"
            >
                {isLoading ? "Loading..." : "Refresh Data"}
            </Button>
        </div>
    );
};

export default SyncGradeDistributionButton;