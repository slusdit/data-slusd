import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db";
import GradeDistribution2 from "../components/GradeDistribution2";
import GradeDistribution3 from "../components/GradeDistribution3";

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
    
    const ellOptions = [...new Set(rawData.map(item => item.ell).filter(Boolean))];
    const specialEdOptions = [...new Set(rawData.map(item => item.specialEd).filter(Boolean))];
    const ardOptions = [...new Set(rawData.map(item => item.ard).filter(Boolean))];

    const data = await prisma.teacherGradeSummary.findMany({});
    
    if (!session) {    
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">Grade Distribution</h1>
                <p className="text-muted-foreground">Grade Distribution Description</p>
                <p className="text-red-500">You must be logged in to view this page.</p>
            </div>
        );
    }
    
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
                    <p className="text-muted-foreground">View and filter grade distributions across teachers, departments, and student demographics</p>
                </div>
                <GradeDistribution3 
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