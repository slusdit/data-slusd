/**
 * Zod schemas for saved-report (Query) editing, shared by the admin Edit Query
 * dialog (react-hook-form) and the updateQuery server action. Kept free of
 * server imports so client components can use it.
 */
import { z } from "zod";

// Query.name is a plain Prisma `String` column: VARCHAR(191) in MySQL
export const QUERY_TEXT_MAX = 191;
// Query.description is TEXT (65,535 bytes); 16,000 characters fits even at 4 bytes per utf8mb4 character
export const QUERY_DESCRIPTION_MAX = 16000;
const tooLong = (field: string, max = QUERY_TEXT_MAX) => `${field} must be ${max.toLocaleString()} characters or fewer`;

/** The URL slug stored in Query.label (unique), derived from the report name. */
export function queryLabel(name: string): string {
  return name.toLowerCase().replaceAll("(", "").replaceAll(")", "").replaceAll("%", "").replaceAll(/\s+/g, "-");
}

/** The Add Query form's values, also re-checked by the addQuery server action. */
export const queryFormSchema = z.object({
  query: z.string().min(1, { message: "Query must not be empty" }),
  name: z.string().trim().min(1, { message: "Query Title must not be empty" }).max(QUERY_TEXT_MAX, tooLong("Query name")),
  createdBy: z.string().email({ message: "Must be a valid email" }),
  description: z
    .string()
    .min(1, { message: "Description must not be empty" })
    .max(QUERY_DESCRIPTION_MAX, tooLong("Description", QUERY_DESCRIPTION_MAX)),
  categoryId: z.string().min(1, { message: "Pick a category" }),
  hiddenCols: z.string().optional(),
  totalColumns: z.string().optional(),
  chart: z.boolean(),
  chartStackKey: z.boolean().optional(),
  chartXKey: z.string().optional(),
  chartYKey: z.string().optional(),
  chartTypeKey: z.string().optional(),
});

export type QueryFormValues = z.infer<typeof queryFormSchema>;

// Fields the admin Edit Query dialog may change (finding U6: the old single-field
// update silently dropped every edit except the SQL). `.strict()` rejects
// anything else so a client cannot write createdBy, label or roles this way.
export const editableQueryFields = z
  .object({
    name: z.string().min(1, "Name is required").max(QUERY_TEXT_MAX, tooLong("Name")).optional(),
    categoryId: z.string().nullable().optional(),
    description: z.string().max(QUERY_DESCRIPTION_MAX, tooLong("Description", QUERY_DESCRIPTION_MAX)).optional(),
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
  name: z.string().min(1, "Name is required").max(QUERY_TEXT_MAX, tooLong("Name")),
  categoryId: z.string(),
  description: z.string().max(QUERY_DESCRIPTION_MAX, tooLong("Description", QUERY_DESCRIPTION_MAX)),
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
