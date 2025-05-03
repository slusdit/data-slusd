'use client';

import { Button } from "@/components/ui/button";
import { syncGradeDistribution } from "@/lib/syncGradeDistribution";
import { useEffect } from "react";

const SyncGradeDistributionButton = () => {
    const handleSync = async () => {

        syncGradeDistribution();
        console.log("Syncing grades...");

    };

    return (
        <div>
            <Button
                onClick={handleSync}
            >
                Sync Grades
            </Button>
        </div>
    );
};

export default SyncGradeDistributionButton;