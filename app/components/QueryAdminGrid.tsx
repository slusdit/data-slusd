"use client";
import { useRef, useEffect, useMemo, useCallback, forwardRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AggridChart from "./AggridChart";
import { Button } from "@/components/ui/button";
import { GridApi, ICellEditorParams } from "ag-grid-community";
import { QueryWithCategory } from "./QueryBar";
import { toast } from "sonner";
import { updateQuery } from "@/lib/formActions";
import { PrismaClient, Session } from "@prisma/client";
import { useTheme } from "next-themes";
import { format } from "sql-formatter";
import { deleteQuery } from "@/lib/deleteQuery";
import AddQueryForm from "./forms/AddQueryForm";
import FormDialog from "./forms/FormDialog";
import { Plus } from "lucide-react";
import Link from "next/link";

const QueryEditor = forwardRef((props: ICellEditorParams, ref) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const initialValue = props.value;
  // console.log({...props})

  useEffect(() => {
    if (textAreaRef.current) {
      const formattedValue = format(initialValue || '', {
        language: "tsql",
        keywordCase: "upper",
      });
      textAreaRef.current.value = formattedValue;
      textAreaRef.current.focus();
    }
  }, [initialValue]);

  const getValue = () => {
    return textAreaRef.current?.value || '';
  };

  useEffect(() => {
    if (ref && typeof ref === 'object') {
      (ref as any).current = {
        getValue,
        isCancelBeforeStart: () => false,
        isCancelAfterEnd: () => false,
      };
    }
  }, []);
  // console.log({ref})
  const handleKeyUp = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        const start = textAreaRef.current!.selectionStart;
        const end = textAreaRef.current!.selectionEnd;
        const value = textAreaRef.current!.value;
        const newValue = value.substring(0, start) + '\n' + value.substring(end);
        // textAreaRef.current!.value = newValue;
        textAreaRef.current!.selectionStart = textAreaRef.current!.selectionEnd = start + 1;
        event.preventDefault();
      } else {
        event.preventDefault();
        event.stopPropagation();
        try {
          const value = getValue();
          const formattedQuery = format(value || '', {
            language: "tsql",
            keywordCase: "upper",
          });

          const data = { ...props.data, query: formattedQuery };
          await updateQuery(data, 'query');

          // Update the cell value directly in the grid

          // console.log('props.api', { ...props });
          const rowNode = props.api.getRowNode(props.data.id.toString());
          // console.log('rowNode', rowNode);
          if (rowNode) {
            rowNode.setDataValue('query', formattedQuery);
          }

          toast.success("Query updated successfully");
          if (props.stopEditing) {
            props.stopEditing();
          }
        } catch (error) {
          console.error("Error updating query:", error);
          toast.error("Error updating query: Invalid SQL format");
          if (props.stopEditing) {
            props.stopEditing();
          }
        }
      }
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      defaultValue={initialValue}
      onKeyUp={handleKeyUp}
      className="w-[500px] h-[600px] p-4 font-mono text-sm bg-background border rounded-md whitespace-pre-wrap"
    />
  );
});

QueryEditor.displayName = 'QueryEditor';

const QueryAdminGrid = ({
  dataIn,
  session,
  categories,
}: // onCellValueChange
{
  dataIn: QueryWithCategory[];
  session: Session;
  categories: any[];
  // onCellValueChange: (event: any) => void
}) => {
  const { theme } = useTheme();
  const agGridTheme = theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine";
  const gridRef = useRef<AgGridReact>(null);

  const categoryNameArray = useMemo(() => {
    return categories.map((category) => category.label).sort();
  }, [categories]);

  const categoryValueFormatter = (params: { value: string }) => {
    const selectedCategory = categoryNameArray.find(
      (category) => category.label === params.value
    );
    return selectedCategory?.id;
  };

  const nameRenderer = (params: {
    data: { name: string; id: string; category: { label: string } };
  }) => {
    return (
      <div className="cursor-pointer text-blue-500 underline">
        <Link
          href={`/query/${params.data.category.label.toLowerCase()}/${params.data.id}`}
          target="_blank"
        >
          {params.data.name}
        </Link>
      </div>
    );
  };

  const createAgGridData = (data: any[]) => {
    if (!data || !data.length) return { data: [], colDefs: [] };

    const keys = Object.keys(data[0]);
    let colDefs = keys.map((key, index) => {
      if (["id", "category", 'createdBy', 'publicQuery'].includes(key)) {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          autoSize: true,
          minWidth: 25,
          hide: true,
          cellStyle: { whiteSpace: "normal" },
        };
      } else if (["publicQuery", "chart", "chartStackKey"].includes(key)) {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          cellDataType: "boolean",
          autoSize: true,
          cellStyle: { whiteSpace: "normal" },
        };
      } else if ("categoryId" === key) {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: categoryNameArray,
            valueFormatter: categoryValueFormatter,
          },
          valueGetter: (params: { data: { category: { label: string } } }) => {
            return params.data?.category?.label;
          },
          valueSetter: (params: {
            newValue: string,
            data: { categoryId: string, category: { label: string } }
          }) => {
            const selectedCategory = categories.find(
              (category) => category.label === params.newValue
            );
            if (selectedCategory) {
              params.data.categoryId = selectedCategory.id;
              params.data.category = selectedCategory;
              return true;
            }
            return false;
          },
          valueFormatter: (params: { value: { label: any } }) => {
            const selectedCategory = categories.filter((category) => category.label === params.value);
            return selectedCategory[0]?.label;
          },
          autoSize: true,
          cellStyle: { whiteSpace: "normal" },
        };
      } else if ("query" === key) {
        return {
          field: key.trim(),
          resizable: true,
          suppressKeyboardEvent: (params: { event: KeyboardEvent }) => {
            return params.event.key === "Enter";
          },
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          cellEditor: QueryEditor,
          cellEditorPopup: true,
          cellEditorPopupStyle: {
            width: '800px',
            maxWidth: '90vw',
          },
          autoSize: true,
          minWidth: 600,
          cellStyle: { whiteSpace: "pre-wrap" },
          valueSetter: (params: { newValue: string; data: any }) => {
            const oldValue = params.data.query;
            params.data.query = params.newValue;
            console.log( 'gridRef.current.api',gridRef.current?.api);
            // Trigger the onCellValueChanged event
            if (oldValue !== params.newValue && gridRef.current?.api) {
              const rowNode = gridRef.current.api.getRowNode(params.data.id.toString());
              if (rowNode) {
                rowNode.setDataValue('query', params.newValue);
                gridRef.current.api.refreshCells({
                  force: true,
                  rowNodes: [rowNode],
                  columns: ['query']
                });
              }
            }
            return true;
          }
          // cellRenderer: (params: { value: string }) => {
          //   try {
          //     return format(params.value || '', {
          //       language: "tsql",
          //       keywordCase: "upper",
          //     });
          //   } catch (error) {
          //     return params.value;
          //   }
          // }
        };
      } else if ("name" === key) {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          cellRenderer: nameRenderer,
          autoSize: true,
          minWidth: 300,
          cellStyle: { whiteSpace: "normal" },
        };
      } else {
        return {
          field: key.trim(),
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
          editable: true,
          autoSize: true,
          minWidth: 25,
          cellStyle: { whiteSpace: "normal" },
        };
      }
    });

    colDefs = [
      ...colDefs,
      {
        field: "delete",
        resizable: true,
        sortable: false,
        filter: false,
        floatingFilter: false,
        editable: false,
        autoSize: true,
        valueFormatter: (params) => params.value,
        cellEditorParams: {},
        minWidth: 25,
        cellStyle: { whiteSpace: "normal" },
        cellRenderer: (params: { data: any }) => (
          <Button
            className="bg-destructive text-white hover:bg-red-600"
            size="sm"
            onClick={() => {
              if (gridRef.current) {
                const confirmDelete = window.confirm(
                  `Are you sure you want to delete ${params.data.name}`
                );
                if (!confirmDelete) return;
                try {
                  gridRef.current.api.applyTransaction({
                    remove: [params.data],
                  });
                  deleteQuery({ id: params.data.id });
                  toast.success(`Query ${params.data.name} deleted successfully`);
                } catch (e) {
                  console.error(e);
                  toast.error(`Error deleting query ${params.data.name}`);
                }
              }
            }}
          >
            Delete
          </Button>
        ),
      },
    ];

    let formattedData = data.map((row) =>
      keys.reduce((acc, key) => {
        if (!row[key]) return acc;
        acc[key.trim()] = row[key] ?? "";
        return acc;
      }, {})
    );

    return { data: formattedData, colDefs };
  };

  // const { data, colDefs } = useMemo(
  //   () => {
  //     createAgGridData(dataIn),
  //   }
  //   [dataIn, createAgGridData]
  // );
  const { data, colDefs } = useMemo(() => {
    const gridData = createAgGridData(dataIn);
    const queryColDef = gridData.colDefs.find(col => col.field === 'query');
    if (queryColDef) {
      queryColDef.valueSetter = (params: { newValue: string; data: any }) => {
        const oldValue = params.data.query;
        params.data.query = params.newValue;
        console.log( 'params.data.query',params.data.query);
        
        // Instead of dispatching event, update the cell directly
        if (oldValue !== params.newValue && gridRef.current?.api) {
          const rowNode = gridRef.current.api.getRowNode(params.data.id.toString());
          if (rowNode) {
            rowNode.setDataValue('query', params.newValue);
          }
        }
        return true;
      };
    }
    return gridData;
  }, [dataIn, createAgGridData]);

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
    }
  }, []);

  let gridApi: GridApi;

  const onExportToCsv = () => {
    gridApi.exportDataAsCsv();
  };

  const onGridReady = (params: { api: GridApi<any> }) => {
    gridApi = params.api;
    autoSizeStrategy();
  };
  const onCellValueChanged = async (event: { colDef?: any; data?: any; oldValue?: string; newValue?: string }) => {
    const field = event.colDef?.field;
    const { data } = event;

    console.log('field', field, 'data', data);
    if (!field || !data || field === 'query') return;

    try {
      await updateQuery(data, field);
      toast.success("Query updated successfully");
    } catch (error) {
      console.error("Error updating query:", error);
      toast.error("Error updating query");
    }

  };


  return (
    <div className={agGridTheme} style={{ height: "100%", width: "100%" }}>
<style jsx global>{`
        .ag-popup-editor {
          max-width: 90vw !important;
        }
        .ag-popup-child {
          max-width: 100% !important;
        }
      `}</style>

      <div className="flex justify-between mb-2">
        <div className="text-3xl text-foreground font-semibold">Queries</div>
        <div className="flex space-x-2">
          <FormDialog triggerMessage="Add Query" icon={<Plus className="w-4 h-4" />}>
            <AddQueryForm session={session} categories={categories} />
          </FormDialog>

          <Button
            onClick={onExportToCsv}
            className="text-foreground"
            variant="outline"
          >
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="h-full w-full">
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

export default QueryAdminGrid;