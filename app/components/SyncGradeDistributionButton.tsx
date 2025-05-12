'use client';

import { Button } from "@/components/ui/button";
import { aggregateTeacherGradeSummaries, syncGradeDistribution } from "@/lib/syncGradeDistribution";
import { useEffect, useState } from "react";

const SyncGradeDistributionButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFullSync = async () => {
        setIsLoading(true);
        try {
            await syncGradeDistribution();  // Uncomment if you want to include this function
            // await aggregateTeacherGradeSummaries();
            console.log("Syncing grades...");
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
                {isLoading ? "Loading..." : "Sync Grades"}
            </Button>
            <Button
                onClick={handleSummarySync}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Sync Summary"}
            </Button>
            <Button
                onClick={handleSummarySyncReset}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Sync Summary Reset"}
            </Button>
        </div>
    );
};

export default SyncGradeDistributionButton;