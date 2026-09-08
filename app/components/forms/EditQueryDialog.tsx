"use client";

/**
 * Edit / duplicate a saved report with react-hook-form + zod (finding U12),
 * replacing the hand-rolled dialog state in QueryAdminGrid. Editing goes
 * through updateQuery(id, data); duplicating creates a new report via addQuery.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { format } from "sql-formatter";
import { toast } from "sonner";
import { CHARTTYPE } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { addQuery, updateQuery } from "@/lib/formActions";
import { editQueryFormSchema, type EditQueryFormValues } from "@/lib/querySchemas";
import type { QueryWithCategory } from "../QueryBar";

const chartTypes = Object.values(CHARTTYPE).map((t) => t.toLowerCase());

export interface EditQueryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "edit" | "duplicate";
  query: QueryWithCategory | null;
  categories: { id: string; label: string }[];
  /** email recorded as createdBy when duplicating */
  createdBy: string;
  onSaved: (id: string, values: EditQueryFormValues) => void;
}

function toFormValues(query: QueryWithCategory | null, mode: "edit" | "duplicate"): EditQueryFormValues {
  return {
    name: query ? (mode === "duplicate" ? `${query.name} (Copy)` : query.name) : "",
    categoryId: query?.categoryId ?? "",
    description: query?.description ?? "",
    query: query?.query ?? "",
    chart: query?.chart ?? false,
    chartTypeKey: query?.chartTypeKey ?? "",
    chartXKey: query?.chartXKey ?? "",
    chartYKey: query?.chartYKey ?? "",
    chartStackKey: Boolean(query?.chartStackKey),
    hiddenCols: query?.hiddenCols ?? "",
    totalColumns: query?.totalColumns ?? "",
  };
}

export default function EditQueryDialog({
  open,
  onOpenChange,
  mode,
  query,
  categories,
  createdBy,
  onSaved,
}: EditQueryDialogProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<EditQueryFormValues>({
    resolver: zodResolver(editQueryFormSchema),
    values: toFormValues(query, mode),
  });
  const chartEnabled = form.watch("chart");

  const formatSql = () => {
    try {
      form.setValue("query", format(form.getValues("query"), { language: "tsql", keywordCase: "upper" }), {
        shouldDirty: true,
      });
    } catch {
      toast.error("Failed to format SQL - check for syntax errors");
    }
  };

  const onSubmit = async (values: EditQueryFormValues) => {
    setSubmitting(true);
    try {
      if (mode === "edit") {
        if (!query) return;
        await updateQuery(query.id, values);
        onSaved(query.id, values);
        toast.success("Query updated");
      } else {
        await addQuery({
          ...values,
          createdBy,
          hiddenCols: values.hiddenCols,
          totalColumns: values.totalColumns,
          chartXKey: values.chartXKey || undefined,
          chartYKey: values.chartYKey || undefined,
          chartTypeKey: values.chartTypeKey || undefined,
        });
        toast.success(`Created "${values.name}"`);
        router.refresh();
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save query");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Query" : "Duplicate Query"}</DialogTitle>
          <DialogDescription>
            {mode === "edit" ? "Update query settings and SQL" : "Create a copy of this query"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>SQL Query</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={formatSql}>
                      Format SQL
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea {...field} className="font-mono text-sm min-h-[200px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">Chart Configuration</h3>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="chart"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0 pt-6">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />
                      </FormControl>
                      <FormLabel className="font-normal">Enable Chart</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chartTypeKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chart Type</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange} disabled={!chartEnabled}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {chartTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chartStackKey"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0 pt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(c) => field.onChange(c === true)}
                          disabled={!chartEnabled}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Stacked chart</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <FormField
                  control={form.control}
                  name="chartXKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>X Axis Key</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!chartEnabled} placeholder="Column name for X axis" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chartYKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Y Axis Key</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!chartEnabled} placeholder="Column name for Y axis" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="hiddenCols"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hidden Columns (comma separated)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., id, internal_code" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalColumns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Columns (comma separated)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., # UPP, Total, UPP %:ratio(# UPP,Total)" />
                  </FormControl>
                  <FormDescription>
                    Adds a totals footer. Each entry is <code>column</code> (sum), <code>column:fn</code> with fn
                    = sum, avg, min, max or count, or <code>column:ratio(numerator,denominator)</code> for 100 ×
                    sum(numerator) / sum(denominator). Leave blank for no footer.
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {mode === "edit" ? "Save Changes" : "Create Copy"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
