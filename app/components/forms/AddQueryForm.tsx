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

type PageValues = {
  id: string;
  query: string;
  name: string;
  label: string;
  createdBy: string;
  description: string;
  publicQuery: boolean;
  categoryId: string | null;
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
  // label: z.string(),
  createdBy: z.string().email({ message: "Must be a valid email" }),
  description: z.string().min(1, { message: "Description must not be empty" }),
  publicQuery: z.boolean().default(false),
  categoryId: z.string(),
});

export default function AddQueryForm({
  session,
  categories,
  submitTitle,
  pageValues,
  dialogState,
}: Props) {
  const createdBy = session.user?.email?.toString();
  const { query, name, description, publicQuery, categoryId, id } =
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
      publicQuery: publicQuery ?? false,
      categoryId: categoryId ?? "0",
    },
  });

  function onError(errors: any) {
    console.log("Form validation failed", errors);
  }

  // const { closeDialog } = useDialog()
  async function onSubmit(values: z.infer<typeof queryFormSchema>) {
    console.log("submit");
    console.log('values', {values})
    try {
      // TODO: validate SQL, try running it?

    } catch (e) {
      console.error(e);
      toast.error(`Error running query \n Error: ${e}`);
    }

    try {
      console.log(`Values - ${JSON.stringify(values)}`);
      const response = await addQuery(values);
      console.log({response})
      // const query = await response.json();
      form.reset();
      toast.success("Query inserted successfully");
    } catch (e) {
      console.error(e);
      toast.error(`Error creating query \n Error: ${e}`);
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
      <div className="flex w-full m-2 justify-between">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Query Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="createdBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Created By<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="w-fit" {...field} disabled />
              </FormControl>
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
            <FormLabel>
              Description<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder={description} {...field} />
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
            <FormLabel>
              Query<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder={query} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between w-full p-2 border-2 rounded">
        <FormField
          control={form.control}
          name="publicQuery"
          render={({ field }) => (
            <FormItem className="m-1">
              <FormLabel className="m-1">Public Query</FormLabel>
              <FormControl>
                <Switch
                  {...field}
                  id="publicQuery"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          className="w-full"
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="m-1 w-48">
              <FormLabel>Query Category</FormLabel>
              <FormControl className="w-full">
                <Select onValueChange={field.onChange} defaultValue={field.value} className="w-full">
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Select a category" />
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
      <Button type="submit">
        {submitTitle ?? "Add"}
        <Plus className="py-1" />
      </Button>
    </form>
  </Form>
  );
}
