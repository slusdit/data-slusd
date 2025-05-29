'use server'
import { z } from "zod"
import { queryFormSchema } from "@/app/components/forms/AddQueryForm"
import { PrismaClient } from "@prisma/client"
// import { prisma } from "@/lib/db"

const prisma = new PrismaClient()

export async function addQuery(values: z.infer<typeof queryFormSchema>) {
  // values.query = values.query.split("\n").map((line) => "\"" + line + "\"").join("\n");

  try {
  const result = await prisma.query.upsert({
    where: {
      name: values.id // Use 'name' or another unique field as the identifier
    },
    update: {
      query: values.query,
      name: values.name,
      createdBy: values.createdBy,
      description: values.description,
      hiddenCols: values.hiddenCols,
      chart: values.chart,
      chartTypeKey: values.chartTypeKey,
      chartStackKey: values.chartStackKey,
      chartXKey: values.chartXKey,
      chartYKey: values.chartYKey,
      categoryId: values.categoryId,
    },
    create: {
      query: values.query,
      name: values.name,
      label: values.name.toLowerCase().replaceAll('(', "").replaceAll(')', "").replaceAll('%', "").replaceAll(/\s+/g, "-"),
      createdBy: values.createdBy,
      description: values.description,
      hiddenCols: values.hiddenCols,
      chart: values.chart,
      chartTypeKey: values.chartTypeKey,
      chartStackKey: values.chartStackKey,
      chartXKey: values.chartXKey,
      chartYKey: values.chartYKey,
      categoryId: values.categoryId,
    },
  })
  // console.log({result})
    
  return true
  } catch (error) {
    console.error("Error upserting query:", error)
    return error
  }
}

export async function updateQuery(data: any, field: string) {
  const { id, ...updateData } = data

  // console.log("updateQuery", data)
  // console.log({[field]: updateData[field as keyof typeof updateData]})
  // try {
  const result = await prisma.query.update({
    where: {
      id: id
    },
    data: { [field]: updateData[field as keyof typeof updateData] }
  })
  return result
  // } catch (error) {
  // console.error("Error updating query:", error)
  // return error
  // }
};

// UPDATED: Improved updateUser function with better handling of many-to-many relationships
export async function updateUser(data: any, field: string) {
  console.log(`Updating user ${data.id} - Field: ${field}`, data);
  
  try {
    if (field === "User Roles") {
      // UPDATED: Use the userRole many-to-many relationship instead of manual junction table management
      await prisma.user.update({
        where: { id: data.id },
        data: {
          userRole: {
            set: data.userRoleIds?.map((roleId: string) => ({ id: roleId })) || []
          }
        }
      });
      
      console.log(`Updated user roles for user ${data.id}: ${data.userRoleIds?.length || 0} roles`);
    } 
    else if (field === "School Access") {
      // UPDATED: Use the school many-to-many relationship instead of manual junction table management
      await prisma.user.update({
        where: { id: data.id },
        data: {
          school: {
            set: data.schoolIds?.map((schoolId: string) => ({ id: schoolId })) || []
          }
        }
      });
      
      console.log(`Updated school access for user ${data.id}: ${data.schoolIds?.length || 0} schools`);
    }
    else if (field === "Favorites") {
      // Handle favorites relationship - this is a many-to-many through the favorites field
      await prisma.user.update({
        where: { id: data.id },
        data: {
          favorites: {
            set: data.favoriteIds?.map((queryId: string) => ({ id: queryId })) || []
          }
        }
      });
      
      console.log(`Updated favorites for user ${data.id}: ${data.favoriteIds?.length || 0} queries`);
    }
    else {
      // Handle regular field updates
      const updatePayload = { [field]: data[field] };
      
      const result = await prisma.user.update({
        where: { id: data.id },
        data: updatePayload
      });
      
      console.log(`Updated user ${data.id} field ${field}:`, result);
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error updating user ${data.id} field ${field}:`, error);
    throw error; // Re-throw to let the calling code handle it
  }
}