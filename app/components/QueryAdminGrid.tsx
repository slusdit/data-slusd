"use client";
import { useRef, useEffect, useMemo, useCallback, useState, forwardRef } from "react";
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
  const value = props.value;

  useEffect(() => {
    if (textAreaRef.current) {
      const formattedValue = format(value || '', {
        language: "tsql",
        keywordCase: "upper",
      });
      textAreaRef.current.value = formattedValue;
      textAreaRef.current.focus();
    }
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      defaultValue={value}
      className="w-full h-[600px] p-4 font-mono text-sm bg-background border rounded-md whitespace-pre-wrap"
    />
  );
});

QueryEditor.displayName = 'QueryEditor';
const AggridTest = ({
  dataIn,
  session,
  categories,
}: {
  dataIn: QueryWithCategory[];
  session: Session ;
  categories: any[];
}) => {
  const { theme } = useTheme();
  const agGridTheme =
    theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine";
  const gridRef = useRef<AgGridReact>(null);
 
  const categoryNameArray = useMemo(() => {
    return categories.map((category) => category.label).sort();
  }, [categories]);

  const queryRenderer = (params: { value: string }) => {
    if (!params.value) return <></>
    const formattedQuery = format(params.value, {
      language: "tsql",
      keywordCase: "upper",
    })
    // return <div style={{whiteSpace: "pre-wrap"}}>{formattedQuery}</div>

    return <div>{formattedQuery}</div>;
  };

  const categoryValueFormatter = (params: { value: string }) => {
    const selectedCategory = categoryNameArray.find(
      (category) => category.label === params.value
    );
    // console.log('selectedCategory', selectedCategory );
    return selectedCategory?.id;
  };

  const nameRenderer = (params: {
    data: { name: string; id: string; category: { label: string } };
  }) => {
    // console.log(params.data.category);
    return (
      <div className="cursor-pointer text-blue-500 underline">
        <Link
          href={`/query/${params.data.category.label.toLowerCase()}/${
            params.data.id
          }`}
          target="_blank"
        >
          {params.data.name}
        </Link>
      </div>
    );
  };

  const CustomQueryEditor = () => {
    const [value, setValue] = useState('');
    const refInput = useRef(null);
    const afterGuiAttached = () => {
      refInput.current.value = format(value, {
        language: "tsql",
        keywordCase: "upper",
      });
    };

    return {
      // Gets called once before editing starts
      init: function(params: any) {
        setValue(params.value);
        return value;
      },

      // Gets called once when editing is finished
      getValue: function() {
        return refInput.current.value;
      },

      // Return the DOM element of your editor
      getGui: function() {
        const eDiv = document.createElement('div');
        const textArea = document.createElement('textarea');
        textArea.style.height = '200px';
        textArea.style.width = '100%';
        textArea.style.fontFamily = 'monospace';
        textArea.value = format(value, {
          language: "tsql",
          keywordCase: "upper",
        });
        refInput.current = textArea;
        eDiv.appendChild(textArea);
        return eDiv;
      },

      afterGuiAttached,
    };
  };
  const createAgGridData =  (data: any[]) => {
      // console.log({ data })
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
            
      } else
        if (["publicQuery", "chart"].includes(key)) {
          return {
            field: key.trim(),
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,
            cellDataType: "boolean",

            autoSize: true,
            // minWidth: 100,
            // checkboxSelection: index === 0 ? true : false,
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
              // console.log(selectedCategory);
              if (selectedCategory) {
                params.data.categoryId = selectedCategory.id;
                params.data.category = selectedCategory;
                // console.log(params.data.category);
                return true;
              }
              return false;
            },
            
            
            valueFormatter: (params: { value: { label: any } }) => {
              // console.log(params.value);
              // console.log(categories[0]);
              const selectedCategory = categories.filter((category) => category.label === params.value);
              // console.log(selectedCategory)
              return selectedCategory[0]?.label;
             
            },
            autoSize: true,
            // minWidth: 100,
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
        } else if ("query" === key) {
          return {
            field: key.trim(),
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,
            autoHeight: false,
            // cellEditor: "agLargeTextCellEditor",
            // cellEditor: CustomQueryEditor,
            cellEditor: QueryEditor,
            cellEditorPopupStyle: {
              width: '800px',
              maxWidth: '90vw',
            },
            cellEditorPopup: true,
            valueFormatter: (params: { data: { query: string } }) =>
              format(params.data?.query, {
                language: "tsql",
                keywordCase: "upper",
              }),
            cellEditorParams: {
              useFormatter: true,
              maxLength: 999999,
              formatValue: (value: string) => {
                if (!value) return "";
                return value
              }
            },
            cellRenderer: queryRenderer,
            autoSize: true,
            minWidth: 600,
            
            cellStyle: { whiteSpace: "pre-wrap" },
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
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
         } else
          return {
            field: key.trim(),
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,

            autoSize: true,
            minWidth: 25,
            // checkboxSelection: index === 0 ? true : false,
            cellStyle: { whiteSpace: "normal" },
          };
      });
    
    // colDefs = colDefs.filter(colDef => (colDef.field !== 'id') );
    // colDefs = colDefs.filter(colDef => (colDef.field !== 'id') );

      // colDefs = colDefs.map(c => c.field === 'category' ? { ...c, valueFormatter: (params) => params.value?.label } : c);
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
          autoHeight: true, 

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
                    toast.success(
                      `Query ${params.data.name} deleted successfully`
                    );
                  } catch (e) {
                    console.error(e);
                    toast.error(`Error deleting query  ${params.data.name}`);
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
          // acc = {
          //   ...acc,
          //   checkboxSelection: true,
          // };
          // console.log({ acc });
          return acc;
        }, {})
      );

      return { data: formattedData, colDefs };
    }
    

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
      // console.log("Selected rows:", selectedRows);
    }
  }, []);
  const onExportToCsv = () => {
    {
      // console.log("CLICK");
      gridApi.exportDataAsCsv();
    }
  };
  // console.log(data);
  let gridApi: GridApi;
  const onGridReady = (params: { api: GridApi<any> }) => {
    gridApi = params.api;
    autoSizeStrategy();
  };

  const onCellValueChanged = async (event: { colDef?: any; data?: any }) => {
    if (event.colDef?.field === "categoryId") {
      console.log(event)
    }
    // console.log({ event });
    const field = event.colDef.field;

    // console.log({ field });
    const { data } = event;
    // console.log({event})
    // console.log(data);
    try {
      const response = await updateQuery(data, field);
      // console.log({ response });
      toast.success("Query updated successfully");
    } catch (error) {
      console.error("Error updating query:", error);
      toast.error("Error updating query");
      return error;
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

export default AggridTest;
