"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useSession } from 'next-auth/react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Plus, Save, Send } from "lucide-react"
import { User } from "next-auth"


interface Props {
  user: User
  query: string
  submitTitle?: string
  dialogState?: () => void
  icon: React.ReactElement
}

const formSchema = z.object({
  seid: z.string().safeParse(undefined),
  created_by: z.string().email({
    message: "Must be a valid email"
  }),
  docTitle: z.string().min(1, { message: "Document Title must not be empty" }),
  authCode: z.string().min(1, { message: "Authorization Code must not be empty" }),
  subjectCodeMajor: z.string().optional(),
  subjectCodeMinor: z.string().optional(),

})

export function CredentialForm({
  seid,
  docTitle,
  authCode,
  submitTitle,
  dialogState,
  icon
 }: Props) {
  const session = useSession()
  const created_by = session.data?.user?.email?.toString()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seid: seid ?? '',
      docTitle: docTitle ?? '',
      authCode: authCode ?? '',
      created_by: created_by,

    }
  })

  // const { closeDialog } = useDialog()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submit')

    try {
      console.log(`Values - ${JSON.stringify(values)}`)

      const response = await fetch('/api/credential/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const credential = await response.json()
      form.reset()
      toast.success("Credential inserted successfully")
      // closeDialog()

    } catch (e) {
      toast.error(`Error creating credential \n Error: ${e}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full m-2 jutify-between">

        <FormField
          control={form.control}
          name="seid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher Seid<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                {seid ?
                  <Input value={seid} disabled /> :
                  <Input placeholder="seid" {...field} />
                }
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="created_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entered By<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input  {...field} disabled /> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          </div>
        <FormField
          control={form.control}
          name="docTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Title<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Doc Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Authorization Code<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Authorization Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex p-2 border-2 rounded">
          <FormField
            control={form.control}
            name="subjectCodeMajor"
            render={({ field }) => (
              <FormItem className="m-1">
                <FormLabel>Subject Code Major</FormLabel>
                <FormControl>
                  <Input placeholder="Subject Code Major" {...field} />
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
        <Button
          type="submit"
        >{submitTitle ?? "Add"}<Save className="py-1"/></Button>
      </form>
    </Form>
  )
}
