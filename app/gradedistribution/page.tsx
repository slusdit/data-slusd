import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db";

import SyncGradeDistributionButton from "../components/SyncGradeDistributionButton";
import GradeDistribution from "../components/GradeDistribution";
import { aggregateTeacherGradeSummaries, getHighestIndexTermFromDatabase } from "@/lib/syncGradeDistribution";

export default async function GradeDistributionPage() {
    const session = await auth();

    if (!session) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">Grade Distribution</h1>
                <p className="text-muted-foreground">
                    Analyze A–F grade distributions by school, teacher, course, and student group.
                </p>
                <p className="text-red-500">You must be logged in to view this page.</p>
            </div>
        );
    }

    const userSchools = session.user.schools?.map(Number).filter(n => !isNaN(n)) || [];
    const schoolFilter = userSchools.length > 0 ? userSchools : undefined;

    const rawData = await prisma.gradeDistribution.findMany({
        where: schoolFilter ? { sc: { in: schoolFilter } } : undefined,
        select: {
            ell: true,
            specialEd: true,
            ard: true,
            schoolYear: true,
            period: true
        },
        distinct: ['ell', 'specialEd', 'ard', 'schoolYear', 'period']
    });

    const ellOptions = [...new Set(rawData.map(item => item.ell).filter((v): v is string => Boolean(v)))];
    const specialEdOptions = [...new Set(rawData.map(item => item.specialEd).filter((v): v is string => Boolean(v)))];
    const ardOptions = [...new Set(rawData.map(item => item.ard).filter((v): v is string => Boolean(v)))];
    const schoolYearOptions = [...new Set(rawData.map(item => item.schoolYear).filter((v): v is string => Boolean(v)))].sort().reverse();
    const periodOptions = [...new Set(rawData.map(item => item.period).filter((v): v is string => Boolean(v)))].sort();

    // Defaults first, then aggregate only the default year and term (finding P6);
    // the client re-queries through the server action whenever a filter changes.
    const termFilter = (session?.user?.activeSchool > 10) ? session?.user?.activeSchool : undefined;
    const defaultSchoolYear = schoolYearOptions.length > 0 ? schoolYearOptions[0] : undefined;
    const defaultTerm = await getHighestIndexTermFromDatabase({ sc: termFilter, schoolYear: defaultSchoolYear })
    const sentTerm = defaultTerm?.term ? defaultTerm.term : "SEM1"

    const data = await aggregateTeacherGradeSummaries({ scs: schoolFilter, schoolYear: defaultSchoolYear, term: sentTerm })

    return (
        <div className="container mx-auto p-4">
            <Button variant="link">
                <Link href="/" className="hover:underline text-primary flex">
                    <ArrowLeft className="h-4 w-4 mr-2 text-primary" />Home
                </Link>
            </Button>
            
            <div className="space-y-4">
                <div>
                    <h1 className="text-3xl font-bold">Grade Distribution by Course</h1>
                    <p className="text-muted-foreground">Please select a Term and Course to view data</p>
                </div>
                <GradeDistribution
                    data={data ?? []}
                    defaultTerm={[sentTerm]}
                    studentAttributes={{
                        ellOptions,
                        specialEdOptions,
                        ardOptions,
                        schoolYearOptions,
                        periodOptions
                    }}
                    activeSchool={session.user.activeSchool.toString()}
                    user={session.user}
                />
                
            </div>
        </div>
    );
}