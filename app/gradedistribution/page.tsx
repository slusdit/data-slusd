import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GradeDistribution from "@/app/components/GradeDistribution";
import prisma from "@/lib/db";
export default async function GradeDistributionPage() {
    const percentQueryId = process.env.QUERY_ASSESSMENT_GRADE_PERCENTAGE;
    const session = await auth();

    const resultsPercent = await prisma.query.findUnique({ 
        where: { id: percentQueryId } 
    });

    if (!resultsPercent) {
        return <div>No results found</div>;
    }

    const data = await runQuery(resultsPercent.query);

    return (
        <div className="container mx-auto p-4">
            <Button variant="link">
                <Link href="/" className="hover:underline text-primary flex">
                    <ArrowLeft className="h-4 w-4 mr-2 text-primary" />Home
                </Link>
            </Button>
            
            <div className="space-y-4">
                <div>
                    <h1 className="text-3xl font-bold">{resultsPercent.name}</h1>
                    <p className="text-muted-foreground">{resultsPercent.description}</p>
                </div>

                <GradeDistribution data={data} />
            </div>
        </div>
    );
}