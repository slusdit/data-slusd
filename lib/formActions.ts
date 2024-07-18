'use server'

import { PrismaClient } from "@prisma/client"
import { z } from "zod"

import { queryFormSchema } from "@/app/components/forms/AddQueryForm"

const prisma = new PrismaClient()

// Define the form schema to be used in the addQuery function


export async function addQuery(values: z.infer<typeof queryFormSchema>) {
    // values.query = values.query.split("\n").map((line) => "\"" + line + "\"").join("\n");
    console.log("addQuery", values)
  try {
    const result = await prisma.query.upsert({
      where: {
        id: values.id || "" // Use an empty string or some other unique identifier
      },
      update: {
        query: values.query,
        name: values.name,
        createdBy: values.createdBy,
        description: values.description,
        publicQuery: values.publicQuery,
        categoryId: values.categoryId,
      },
      create: {
        query: values.query,
          name: values.name,
        label: values.name.toLowerCase().replace(/\s+/g, "-"),
        createdBy: values.createdBy,
        description: values.description,
        publicQuery: values.publicQuery,
        categoryId: values.categoryId,
      },
    })
      
    return result
  } catch (error) {
    console.error("Error upserting query:", error)
    return error
    throw new Error("Unable to upsert query")
  }
}