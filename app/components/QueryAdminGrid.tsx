"use client";
import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AggridChart from "./AggridChart";
import { Button } from "@/components/ui/button";
import { GridApi } from "ag-grid-community";
import { QueryWithCategory } from "./QueryBar";
import { toast } from "sonner";
import { updateQuery } from "@/lib/formActions";
import { PrismaClient } from "@prisma/client";
import { useTheme } from "next-themes";


const AggridTest = ({
    dataIn,
    // onCellValueChange
}: {
    dataIn: QueryWithCategory[]
    // onCellValueChange: (event: any) => void 
}) => {
    const { theme } = useTheme();
    const agGridTheme = theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
    const gridRef = useRef<AgGridReact>(null);
    console.log({ dataIn })

    const createAgGridData = useMemo(
        () => (data: any[]) => {

            console.log({ data })
            if (!data || !data.length) return { data: [], colDefs: [] };

            const keys = Object.keys(data[0]);
            let colDefs = keys.map((key, index) => ({
                field: key.trim(),
                resizable: true,
                sortable: true,
                filter: true,
                floatingFilter: true,
                editable: true,

                autoSize: true,
                // minWidth: 100,
                // checkboxSelection: index === 0 ? true : false,
                cellStyle: { whiteSpace: "normal" },
            }));
            
            colDefs = colDefs.map(c => c.field === 'category' ? { ...c, valueFormatter: (params) => params.value?.label } : c);

            let formattedData = data.map((row) =>
                keys.reduce((acc, key) => {
                    if (!row[key]) return acc;
                    acc[key.trim()] = row[key] ?? "";
                    // acc = {
                    //   ...acc,
                    //   checkboxSelection: true,
                    // };
                    // console.log({ acc });
                    return acc;
                }, {})
            );


            return { data: formattedData, colDefs };
        },
        [dataIn]
    );

    const { data, colDefs } = useMemo(

        () => createAgGridData(dataIn),
        [dataIn, createAgGridData]
    );

    const autoSizeStrategy = () => {
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.autoSizeAllColumns(false, ["setColumnWidth"]);
            gridRef.current.api.sizeColumnsToFit();
        }
    };

    useEffect(() => {
        autoSizeStrategy();
    }, [data]);

    const onSelectionChanged = useCallback(() => {
        if (gridRef.current) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            console.log("Selected rows:", selectedRows);
        }
    }, []);
    const onExportToCsv = () => {
        {
            console.log("CLICK");
            gridApi.exportDataAsCsv();
        }
    }
    console.log(data);
    let gridApi: GridApi;
    const onGridReady = (params) => {
        gridApi = params.api;
        autoSizeStrategy();
    };




    const onCellValueChanged = async (event) => {

        console.log({ event });
        const field = event.colDef.field;

        console.log({ field });
        const { data } = event;
        console.log(data);
        try {
            const response = await updateQuery(data, field);
            console.log({ response });
            toast.success("Query updated successfully");
        } catch (error) {
            console.error("Error updating query:", error);
            toast.error("Error updating query");
            return error;

        }

    }

    return (
        <div className={agGridTheme} style={{ height: "100%", width: "100%" }}>

            <div className="mt-2">
                <div className="text-xl text-foreground">Queries</div>
                <Button
                    onClick={onExportToCsv}
                    className="my-2 text-foreground"
                    variant="outline"

                >
                    Export to CSV
                </Button>

                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={colDefs}
                    domLayout="autoHeight"
                    pagination={true}
                    onGridReady={onGridReady}
                    rowSelection="multiple"
                    onSelectionChanged={onSelectionChanged}
                    onCellValueChanged={onCellValueChanged}
                />
            </div>
        </div>
    );
};

export default AggridTest;


