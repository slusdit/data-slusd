'use server'
import { z } from "zod"
import { queryFormSchema } from "@/app/components/forms/AddQueryForm"
import { PrismaClient } from "@prisma/client"
// import { prisma } from "@/lib/db"

const prisma = new PrismaClient()
export async function addQuery(values: z.infer<typeof queryFormSchema>) {
    // values.query = values.query.split("\n").map((line) => "\"" + line + "\"").join("\n");
    console.log("addQuery", values)
  // try {
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
        label: values.name.toLowerCase().replaceAll('(', "").replaceAll(')', "").replaceAll('%', "").replaceAll(/\s+/g, "-"),
        createdBy: values.createdBy,
        description: values.description,
        publicQuery: values.publicQuery,
        categoryId: values.categoryId,
      },
    })
    console.log({result})
      
    return true
  // } catch (error) {
  //   console.error("Error upserting query:", error)
  //   return error
  // }
}

export async function updateQuery(data:any, field:string) {
  const { id, ...updateData} = data

  console.log("updateQuery", data)
  console.log({[field]: updateData[field as keyof typeof updateData]})
  // try {
    const result = await prisma.query.update({
      where: {
        id: id
      },
      data: {[field]: updateData[field as keyof typeof updateData]}
    })
    return result
  // } catch (error) {
    // console.error("Error updating query:", error)
    // return error
  // }
};

export async function updateUser(data:any, field: string) {
  const { id, ...updateData } = data
  try {
    const result = await prisma.user.update({
      where: {
        id: id
      },
      data: {[field]: updateData[field as keyof typeof updateData]}
    })
    return result
  } catch (error) {
    console.error("Error updating user", error)
    return error
  }
}