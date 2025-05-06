import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GradeDistribution from "@/app/components/GradeDistribution";
import prisma from "@/lib/db";
import GradeDistribution2 from "../components/GradeDistribution2";
import SyncGradeDistributionButton from "../components/SyncGradeDistributionButton";

export default async function GradeDistributionPage() {
    const session = await auth();

    const rawData = await prisma.gradeDistribution.findMany({
        select: {
            ell: true,
            specialEd: true,
            ard: true
        },
        distinct: ['ell', 'specialEd', 'ard']
    });
    console.log("Raw data fetched from the database:", rawData[0]);

    const ellOptions = [...new Set(rawData.map(item => item.ell).filter(Boolean))];
    console.log("Unique ELL options:", ellOptions);
    const specialEdOptions = [...new Set(rawData.map(item => item.specialEd).filter(Boolean))];
    console.log("Unique Special Ed options:", specialEdOptions);
    const ardOptions = [...new Set(rawData.map(item => item.ard).filter(Boolean))];
    console.log("Unique ARD options:", ardOptions);

    const data = await prisma.teacherGradeSummary.findMany({});
    console.log("Data fetched from the database:", data[0]);
    
    if (!session) {    
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">Grade Distribution</h1>
                <p className="text-muted-foreground">Grade Distribution Description</p>
                <p className="text-red-500">You must be logged in to view this page.</p>
            </div>
        );
    }

    //     session.user.schoolSc,
    
    
    return (
        <div className="container mx-auto p-4">
            <Button variant="link">
                <Link href="/" className="hover:underline text-primary flex">
                    <ArrowLeft className="h-4 w-4 mr-2 text-primary" />Home
                </Link>
            </Button>
            
            <div className="space-y-4">
                <div>
                    <h1 className="text-3xl font-bold">Grade Distribution</h1>
                    <p className="text-muted-foreground">Grade Distribution Description</p>
                </div>
                {/* <SyncGradeDistributionButton /> */}
                <GradeDistribution2 
                    data={data} 
                    studentAttributes={{
                        ellOptions,
                        specialEdOptions,
                        ardOptions
                    }}
                    session={session}
                />
            </div>
        </div>
    );
}