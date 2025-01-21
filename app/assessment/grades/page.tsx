import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";
import { ArrowLeft, Home, Plus } from "lucide-react";
import { QueryWithCategory } from "@/app/components/QueryBar";
import { QuerySheet } from "@/app/components/QueiesSheet";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DataTableAgGrid from "@/app/components/DataTableAgGrid";
import { AgGridReact } from "ag-grid-react";

export default async function GradeDistributionPage() {
    const percentQueryId = 'cm63uvaed0005ammu8q0uh7y2'
    const session = await auth();

    // const categories = await prisma.queryCategory.findMany();
    const resultsPercent = await prisma.query.findUnique({ where: { id: percentQueryId } }); //const {id, name, query, description, publicQuery, createdBy }:Query | null = await prisma.query.findUnique({ where: { label: label } })
    let queries: QueryWithCategory[]
    let categories
    if (session?.user) {
        categories = await prisma.queryCategory.findMany(
            {
                include: {
                    queries: true,
                    roles: true,
                },
            },
        );

    }

    // const renderChart = (table) => {
    //   return <DiyChartBySchool table={table} />;
    // };

    if (resultsPercent) {

        let data: any[] = await runQuery(resultsPercent?.query);

        const category = resultsPercent
        function getHiddenColumns(hiddenCols: string): string[] | undefined {

            if (!hiddenCols) {
                return []
            }
            return hiddenCols.split(',').map((col) => col.trim().toUpperCase());

        }

        return (
            <div className="">
                <h1>Teacher Grade Distribution</h1>
                {/* <Sidebar session={session} categories={categories} queries={queries} /> */}
                <div className="flex flex-col w-full items-center">
                    <div className="items-left w-full">

                        {/* <BackButton /> */}
                        <Button
                            variant={"link"}>
                            <Link
                                href="/"
                                className="hover:underline text-primary flex"
                            ><ArrowLeft className="h-4 w-4 mr-2 text-primary " />Home</Link>

                        </Button>
                        <div className="flex justify-between w-full">
                            <h1 className="text-3xl text-left  font-bold">{resultsPercent.name}</h1>



                            
                        </div>

                        <div className="my-2">

                           


                        </div>
                        <label htmlFor="description">Description:</label>
                        <div id="description">{resultsPercent.description}</div>
                    </div>

                    <DataTableAgGrid
                        data={data}
                        id={percentQueryId}
                        showChart={resultsPercent.chart}
                        chartTitle={resultsPercent?.name}
                        chartXKey={resultsPercent?.chartXKey}
                        chartYKey={resultsPercent?.chartYKey}
                        chartTypeKey={resultsPercent?.chartTypeKey}
                        chartStackKey={resultsPercent?.chartStackKey}
                        hiddenColumns={getHiddenColumns(resultsPercent?.hiddenCols)}
                        title={resultsPercent.name}
                        chartSeriesOverride={resultsPercent?.chartSeriesOverride}
                    />
                    

                </div>
            </div>
        );
    } else {
        return <div>No resultsPercents found</div>;
    }
}
