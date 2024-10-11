'use client'
import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AggridChart from './AggridChart';

const AggridTest = ({ data: dataIn }: { data: any[] }) => {
  const gridRef = useRef<AgGridReact>(null);

  const createAgGridData = useMemo(() => (data: any[]) => {
    if (!data.length) return { data: [], colDefs: [] };

    const keys = Object.keys(data[0]);
    const colDefs = keys.map(key => ({ 
      field: key.trim(),
      resizable: true,
      sortable: true,
      filter: true,
      autoSize: true,
      minWidth: 100,
      cellStyle: { whiteSpace: 'normal' },
    }));
    
    const formattedData = data.map(row => 
      keys.reduce((acc, key) => {
        acc[key.trim()] = row[key] ?? '';
        return acc;
      }, {})
    );

    return { data: formattedData, colDefs };
  }, []);

  const { data, colDefs } = useMemo(() => createAgGridData(dataIn), [dataIn, createAgGridData]);

  const autoSizeStrategy = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.autoSizeAllColumns(false, ['setColumnWidth']);
      gridRef.current.api.sizeColumnsToFit();
    }
  };

  useEffect(() => {
    autoSizeStrategy();
  }, [data]);

  const onGridReady = () => {
    autoSizeStrategy();
  };

  const onSelectionChanged = useCallback(() => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      console.log('Selected rows:', selectedRows);
    }
  }, []);

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: '100%', width: '100%' }}
    >
      <AggridChart data={data} />
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={colDefs}
        domLayout='autoHeight'
        pagination={false}
        onGridReady={onGridReady}
        rowSelection="multiple"
        onSelectionChanged={onSelectionChanged}
        suppressRowClickSelection={true}
        checkboxSelection={true}
      />
    </div>
  );
};

export default AggridTest;