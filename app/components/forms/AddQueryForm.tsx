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

type PageValues = {
  id: string;
  query: string;
  name: string;
  label: string;
  createdBy: string;
  description: string;
  publicQuery: boolean;
  categoryId: string | null; 
}
interface Props {
  session: Session;
  // query: string;
  submitTitle?: string;
  pageValues?: PageValues;
  dialogState?: () => void;
  icon: React.ReactElement;
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
  // query,
  submitTitle,
  pageValues,
  dialogState,
  icon,
}: Props) {
  const createdBy = session.user?.email?.toString();
  let {query, name, description, publicQuery, categoryId, id} = pageValues || {}
  // if (pageValues) {
    
  //   {query, name, description, publicQuery, categoryId, id}  = pageValues
  // } 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: query ?? "",
    },
  });

  // const { closeDialog } = useDialog()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit");

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
                  <Input className="w-fit" placeholder={createdBy} {...field} disabled />
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
                <Input   {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        
        <div className="flex p-2 border-2 rounded">
          <FormField
            control={form.control}
            name="publicQuery"
            render={({ field }) => (
              <FormItem className="m-1">
                <FormLabel>Public Query</FormLabel>
                <FormControl>
                  <Switch {...field} label="Public Query" defaultChecked={false} />
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectCodeMinor"
            render={({ field }) => (
              <FormItem className="m-1">
                <FormLabel>Subject Code Minor</FormLabel>
                <FormControl>
                  <Input placeholder="Subject Code Minor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          {submitTitle ?? "Add"}
          <Save className="py-1" />
        </Button>
      </form>
    </Form>
  );
}
