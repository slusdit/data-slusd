'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgGridReact } from 'ag-grid-react';

const ClassBreakdownModal = ({ isOpen, onClose, data, teacher }) => {
  const columnDefs = [
    { field: 'Period', width: 100 },
    { field: 'Course', flex: 1 },
    { field: 'A%', type: 'numericColumn' },
    { field: 'B%', type: 'numericColumn' },
    { field: 'C%', type: 'numericColumn' },
    { field: 'D%', type: 'numericColumn' },
    { field: 'F%', type: 'numericColumn' },
    { field: 'Total', type: 'numericColumn' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Grade Distribution by Class - {teacher}</DialogTitle>
        </DialogHeader>
        <div className="h-[400px] w-full ag-theme-quartz-dark">
          <AgGridReact
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassBreakdownModal;