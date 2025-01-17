"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Plus, Save, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

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
};
interface Props {
  session: Session;
  categories?: any[];
  submitTitle?: string;
  pageValues?: PageValues;
  dialogState?: () => void;
}

export const queryFormSchema = z.object({
  query: z.string().min(1, { message: "Query must not be empty" }),
  name: z.string().min(1, { message: "Query Title must not be empty" }),
  createdBy: z.string().email({ message: "Must be a valid email" }),
  description: z.string().min(1, { message: "Description must not be empty" }),
  categoryId: z.string().min(1, { message: "Category must not be empty" }),
  hiddenCols: z.string().optional(),
  chart: z.boolean(),
  chartStackKey: z.boolean().optional(),
  chartXKey: z.string().optional(),
  chartYKey: z.string().optional(),
  chartTypeKey: z.string().optional(),
});

export default function AddQueryForm({
  session,
  categories,
  submitTitle,
  pageValues,
  dialogState,
}: Props) {
  const createdBy = session.user?.email?.toString();
  const { query, name, description, categoryId, chart, chartStackKey, hiddenCols, chartYKey, chartXKey, chartTypeKey } =
    pageValues || {};


  // if (pageValues) {

  //   {query, name, description, publicQuery, categoryId, id}  = pageValues
  // }
  const form = useForm<z.infer<typeof queryFormSchema>>({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      query: query ?? "",
      createdBy: createdBy ?? "",
      name: name ?? "",
      description: description ?? "",
      categoryId: categoryId ?? "0",
      chart: chart ?? false,
      chartStackKey: chartStackKey ?? false,
      chartXKey: undefined,
      chartYKey: undefined,
      chartTypeKey: "bar",
      hiddenCols: "",
    },
  });

  function onError(errors: any) {
    // console.log("Form validation failed", errors);
  }

  // const { closeDialog } = useDialog()
  async function onSubmit(values: z.infer<typeof queryFormSchema>) {
    // console.log("submit");
    // console.log('values', {values})
    try {
      // TODO: validate SQL, try running it?

    } catch (e) {
      console.error(e);
      toast.error(`Error running query \n Error: ${e}`);
    }

    try {
      // console.log(`Values - ${JSON.stringify(values)}`);
      const response = await addQuery(values);
      // console.log({response})
      // const query = await response.json();
      form.reset();
      toast.success("Query inserted successfully");
    } catch (e) {
      console.error(e);
      toast.error(`Error creating query \n Error: ${e}`);
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
        <div className="flex gap-4">
          <div className="w-full" >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Query Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="..."

                      type="text"
                      {...field} />
                  </FormControl>
                  <FormDescription>Simple query name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="min-w-48 w-[100%]">
                  <FormLabel>Query Category</FormLabel>
                  <FormControl className="w-full">
                    <Select onValueChange={field.onChange} defaultValue={field.value} className="w-full">
                      <SelectTrigger >
                        <SelectValue placeholder="Test" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>

                          {categories.map((category) => (
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
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Detailed query description</FormDescription>
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
              <FormDescription> SQL Query
                <small>
                  <br />
                  `@@asc` - User's current active school
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
                <Input
                  placeholder="..."

                  type="text"
                  {...field} />
              </FormControl>
              <FormDescription>Comma separated list of columns to hide on the result page</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="border-2 border-primary/30 rounded p-2">
          <div className="text-xl underline text-center w-full pb-3">Chart Options</div>
          <div className="grid grid-cols-12 gap-4 p-2 ">

            <div className="col-span-6">

              <FormField
                control={form.control}
                name="chart"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  ">
                    <div className="space-y-2 space-x-2">
                      <FormLabel>Chart?</FormLabel>
                      <FormDescription>Add a chart to the result page?</FormDescription>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <Input
                        placeholder="DT, SC, etc..."

                        type=""
                        {...field} />
                    </FormControl>
                    <FormDescription>Column to use for the X-Axis</FormDescription>
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
                        {...field} />
                    </FormControl>
                    <FormDescription>Comma separated values for items in the Y-axis</FormDescription>
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
                  <FormDescription>Is the Y-Axis information stacked</FormDescription>
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





        <Button type="submit">
          {submitTitle ?? "Add"}
          <Plus className="py-1" />
        </Button>
      </form>
    </Form>
  );
}
