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
import { useEffect } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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
  categories: any[];
  submitTitle?: string;
  pageValues?: PageValues;
  dialogState?: () => void;
}

const formSchema = z.object({
  id: z.string(),
  query: z.string().min(1, { message: "Query must not be empty" }),
  name: z.string().min(1, { message: "Query Titel must not be empty" }),
  // label: z.string(),
  createdBy: z.string().email({ message: "Must be a valid email" }),
  description: z.string().min(1, { message: "Description must not be empty" }),
  publicQuery: z.boolean().default(false),
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
  console.log({ query, name, description, publicQuery, categoryId, id });


  // if (pageValues) {

  //   {query, name, description, publicQuery, categoryId, id}  = pageValues
  // }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: query ?? "",
      createdBy: createdBy ?? "",
      name: name ?? "",
      description: description ?? "",
      publicQuery: publicQuery ?? false,
    },
  });

  // const { closeDialog } = useDialog()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit");
    console.log({ values });

    try {
      console.log(`Values - ${JSON.stringify(values)}`);

      const response = await fetch("/api/credential/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const credential = await response.json();
      form.reset();
      toast.success("Credential inserted successfully");
      // closeDialog()
    } catch (e) {
      toast.error(`Error creating credential \n Error: ${e}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full m-2 jutify-between">
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

        <div className="p-2 border-2 rounded w-full">
          <FormField
            control={form.control}
            name="publicQuery"
            render={({ field }) => (
              <FormItem className="m-1">
                <FormLabel>Public Query</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    id="publicQuery"
                    label="Public Query"
                    defaultChecked={publicQuery}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="m-1">
                <FormLabel>Query Category</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                      <SelectItem
                            id="0"
                            value={null}
                          >
                            None
                          </SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            id={category.id}
                            value={category.value}
                          >
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
