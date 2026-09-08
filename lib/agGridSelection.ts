/**
 * Shared AG Grid row-selection configuration (AG Grid 36 object API). The
 * string form `rowSelection="multiple"` plus per-column `checkboxSelection`
 * and `suppressRowClickSelection` are deprecated and log a warning per grid.
 * The grid renders its own selection column when `checkboxes` is on.
 */
import type { RowSelectionOptions, SelectionColumnDef } from "ag-grid-community";

/** Multi-row selection with a checkbox column and a header select-all checkbox. */
export function multiRowSelection(selectAll: "all" | "filtered" = "all"): RowSelectionOptions {
  return {
    mode: "multiRow",
    checkboxes: true,
    headerCheckbox: true,
    selectAll,
    enableClickSelection: false, // clicking a cell never toggles selection
  };
}

/** Narrow, pinned selection column (replaces the hand-made checkbox columns). */
export const selectionColumnDef: SelectionColumnDef = {
  pinned: "left",
  width: 50,
  resizable: false,
};
