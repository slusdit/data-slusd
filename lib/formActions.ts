'use server'
import { z } from "zod"
import { queryFormSchema } from "@/app/components/forms/AddQueryForm"
import { PrismaClient } from "@prisma/client"
// import { prisma } from "@/lib/db"

const prisma = new PrismaClient()

export async function addQuery(values: z.infer<typeof queryFormSchema>) {
  // values.query = values.query.split("\n").map((line) => "\"" + line + "\"").join("\n");

  try {
    // Generate label from name (same logic as before)
    const label = values.name.toLowerCase().replaceAll('(', "").replaceAll(')', "").replaceAll('%', "").replaceAll(/\s+/g, "-");

    const result = await prisma.query.create({
      data: {
        query: values.query,
        name: values.name,
        label: label,
        createdBy: values.createdBy,
        description: values.description,
        hiddenCols: values.hiddenCols || "",
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
    console.error("Error creating query:", error)
    throw error
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
    if (field === "User") {
      // Handle full user update from the edit dialog
      // Update basic fields and many-to-many relationships
      await prisma.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
          admin: data.admin,
          queryEdit: data.queryEdit,
          primaryRole: data.primaryRole,
          // Manual overrides
          blockedSchools: data.blockedSchools,
          addedSchools: data.addedSchools,
          blockedRoles: data.blockedRoles,
          addedRoles: data.addedRoles,
          // Update schools relationship through UserSchool
          UserSchool: {
            deleteMany: {},
            create: data.schoolIds?.map((schoolId: string) => ({
              schoolSc: schoolId
            })) || []
          }
        }
      });

      // Update roles via explicit UserRole junction table (consistent with Aeries sync)
      if (data.userRoleIds) {
        await prisma.userRole.deleteMany({ where: { userId: data.id } });
        if (data.userRoleIds.length > 0) {
          await prisma.userRole.createMany({
            data: data.userRoleIds.map((roleId: string) => ({
              userId: data.id,
              roleId,
            })),
            skipDuplicates: true,
          });
        }
      }

      console.log(`Updated user ${data.id} with all fields`);
    }
    else if (field === "User Roles") {
      // Use explicit UserRole junction table (consistent with Aeries sync)
      await prisma.userRole.deleteMany({ where: { userId: data.id } });
      if (data.userRoleIds?.length > 0) {
        await prisma.userRole.createMany({
          data: data.userRoleIds.map((roleId: string) => ({
            userId: data.id,
            roleId,
          })),
          skipDuplicates: true,
        });
      }

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

export async function addQueryCategory(data: { label: string; value: string; sort?: number; roleIds?: string[] }) {
  try {
    const result = await prisma.queryCategory.create({
      data: {
        label: data.label,
        value: data.value,
        sort: data.sort ?? 0,
        roles: {
          connect: data.roleIds?.map((id) => ({ id })) || [],
        },
      },
      include: { roles: true },
    });
    return result;
  } catch (error) {
    console.error("Error creating query category:", error);
    throw error;
  }
}

export async function updateQueryCategory(data: { id: string; label?: string; value?: string; sort?: number; roleIds?: string[] }) {
  try {
    const result = await prisma.queryCategory.update({
      where: { id: data.id },
      data: {
        ...(data.label !== undefined && { label: data.label }),
        ...(data.value !== undefined && { value: data.value }),
        ...(data.sort !== undefined && { sort: data.sort }),
        ...(data.roleIds !== undefined && {
          roles: {
            set: data.roleIds.map((id) => ({ id })),
          },
        }),
      },
      include: { roles: true },
    });
    return result;
  } catch (error) {
    console.error(`Error updating query category ${data.id}:`, error);
    throw error;
  }
}

export async function deleteQueryCategory(id: string) {
  try {
    await prisma.queryCategory.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error(`Error deleting query category ${id}:`, error);
    throw error;
  }
}