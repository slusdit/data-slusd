/**
 * Zod schemas for saved-report (Query) editing, shared by the admin Edit Query
 * dialog (react-hook-form) and the updateQuery server action. Kept free of
 * server imports so client components can use it.
 */
import { z } from "zod";

// Fields the admin Edit Query dialog may change (finding U6: the old single-field
// update silently dropped every edit except the SQL). `.strict()` rejects
// anything else so a client cannot write createdBy, label or roles this way.
export const editableQueryFields = z
  .object({
    name: z.string().min(1, "Name is required").optional(),
    categoryId: z.string().nullable().optional(),
    description: z.string().optional(),
    query: z.string().min(1, "SQL is required").optional(),
    chart: z.boolean().optional(),
    chartXKey: z.string().nullable().optional(),
    chartYKey: z.string().nullable().optional(),
    chartTypeKey: z.string().nullable().optional(),
    chartStackKey: z.boolean().optional(),
    hiddenCols: z.string().optional(),
    totalColumns: z.string().nullable().optional(),
    publicQuery: z.boolean().optional(),
  })
  .strict();

export type EditableQueryFields = z.infer<typeof editableQueryFields>;

/** The Edit Query dialog's form values: every editable field, required as strings for inputs. */
export const editQueryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.string(),
  description: z.string(),
  query: z.string().min(1, "SQL is required"),
  chart: z.boolean(),
  chartTypeKey: z.string(),
  chartXKey: z.string(),
  chartYKey: z.string(),
  chartStackKey: z.boolean(),
  hiddenCols: z.string(),
  totalColumns: z.string(),
});

export type EditQueryFormValues = z.infer<typeof editQueryFormSchema>;
