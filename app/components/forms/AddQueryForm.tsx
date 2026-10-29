"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Save, Send, Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addQuery } from "@/lib/formActions";
import { QUERY_DESCRIPTION_MAX, QUERY_TEXT_MAX, queryFormSchema, type QueryFormValues } from "@/lib/querySchemas";
import { Textarea } from "@/components/ui/textarea";
import { useFormDialog } from "@/app/components/forms/FormDialog";

type PageValues = {
  id: string;
  query: string;
  name: string;
  label: string;
  createdBy: string;
  description: string;
  chart: boolean;
  chartXKey: string | null;
  chartYKey: string | null;
  chartTypeKey: string | null;
  chartStackKey: boolean;
  categoryId: string | null;
  hiddenCols: string | null;
  totalColumns?: string | null;
};
interface Props {
  session: Session;
  categories?: any[];
  submitTitle?: string;
  pageValues?: PageValues;
  dialogState?: () => void;
}

export default function AddQueryForm({
  session,
  categories,
  submitTitle,
  pageValues,
  dialogState,
}: Props) {
  const createdBy = session.user?.email?.toString();
  const {
    query,
    name,
    description,
    categoryId,
    chart,
    chartStackKey,
    hiddenCols,
    chartYKey,
    chartXKey,
    chartTypeKey,
  } = pageValues || {};

  // if (pageValues) {

  //   {query, name, description, publicQuery, categoryId, id}  = pageValues
  // }
  const form = useForm<QueryFormValues>({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      query: query ?? "",
      createdBy: createdBy ?? "",
      name: name ?? "",
      description: description ?? "",
      categoryId: categoryId ?? "",
      chart: chart ?? false,
      chartStackKey: chartStackKey ?? false,
      chartXKey: undefined,
      chartYKey: undefined,
      chartTypeKey: "bar",
      hiddenCols: "",
      totalColumns: "",
    },
  });

  function onError(errors: any) {
    // console.log("Form validation failed", errors);
  }

  const { close } = useFormDialog();

  async function onSubmit(values: QueryFormValues) {
    // Basic client-side sanity check; deeper validation happens server-side.
    const trimmedQuery = values.query?.trim() ?? "";
    if (!trimmedQuery) {
      toast.error("Query cannot be empty.");
      return;
    }
    if (!/\bselect\b/i.test(trimmedQuery)) {
      toast.error("Query must be a SELECT statement.");
      return;
    }

    try {
      const result = await addQuery(values);
      if (!result.ok) {
        toast.error(`Failed to create query: ${result.error}`);
        return;
      }
      form.reset();
      toast.success("Query inserted successfully");
      close(); // dismiss the dialog on success
    } catch (e) {
      console.error(e);
      toast.error("Failed to create query: the server could not be reached or hit an unexpected error.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <div className="">
          <div className="flex gap-4 flex-col">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query Name</FormLabel>
                    <FormControl>
                      <Input placeholder="..." type="text" maxLength={QUERY_TEXT_MAX} {...field} />
                    </FormControl>
                    <FormDescription>Simple query name (must be unique)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="min-w-48 w-[100%]">
                    <FormLabel>Query Category</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {(categories ?? []).map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="..."
                    className="resize-y"
                    maxLength={QUERY_DESCRIPTION_MAX}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Detailed query description, {(field.value?.length ?? 0).toLocaleString()}/
                  {QUERY_DESCRIPTION_MAX.toLocaleString()} characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Query</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="SELECT TOP 10 * FROM STU"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {" "}
                  SQL Query
                  <small>
                    <br />
                    `@@asc` - User&apos;s current active school
                  </small>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hiddenCols"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hidden Columns</FormLabel>
                <FormControl>
                  <Input placeholder="..." type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Comma separated list of columns to hide on the result page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalColumns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Columns</FormLabel>
                <FormControl>
                  <Input placeholder="# UPP, Total, UPP %:ratio(# UPP,Total)" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Totals footer: column (sum), column:fn (sum, avg, min, max, count) or
                  column:ratio(numerator,denominator)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border-2 border-primary/30 rounded-sm p-2">
          <div className="text-xl underline text-center w-full pb-3">
            Chart Options
          </div>
          <div className="grid grid-cols-12 gap-4 p-2 ">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="chart"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  ">
                    <div className="space-y-2 space-x-2">
                      <FormLabel>Chart?</FormLabel>
                      <FormDescription>
                        Add a chart to the result page?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="chartTypeKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chart Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="area">Aera</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the chart type</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="chartXKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chart X Key</FormLabel>
                    <FormControl>
                      <Input placeholder="DT, SC, etc..." type="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Column to use for the X-Axis
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="chartYKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chart Y Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="TK,K,1,2,3,4,5..."
                        type=""
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Comma separated values for items in the Y-axis
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="chartStackKey"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Stacked Chart?</FormLabel>
                  <FormDescription>
                    Is the Y-Axis information stacked
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              {submitTitle ?? "Add"}
              <Plus className="py-1" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
