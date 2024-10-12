"use client";
import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import AggridChart from "./AggridChart";
import { Button } from "@/components/ui/button";
import { GridApi } from "ag-grid-community";

const AggridTest = ({ data: dataIn }: { data: any[] }) => {
  const gridRef = useRef<AgGridReact>(null);

  const createAgGridData = useMemo(
    () => (data: any[]) => {
      if (!data.length) return { data: [], colDefs: [] };

      const keys = Object.keys(data[0]);
      const colDefs = keys.map((key, index) => ({
        field: key.trim(),
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,

        autoSize: true,
        // minWidth: 100,
        // checkboxSelection: index === 0 ? true : false,
        cellStyle: { whiteSpace: "normal" },
      }));

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
    []
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
  return (
    <div className="ag-theme-balham" style={{ height: "100%", width: "100%" }}>
      <AggridChart data={data} />
      <div className="mt-2">
        <Button
          onClick={onExportToCsv}
        >
          Export to CSV
        </Button>

        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={colDefs}
          domLayout="autoHeight"
          pagination={false}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default AggridTest;

function createGrid(): GridApi<any> {
  throw new Error("Function not implemented.");
}
