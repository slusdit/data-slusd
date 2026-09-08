'use server'
import { z } from "zod"
import { editableQueryFields, type EditableQueryFields } from "@/lib/querySchemas"
import { recordAudit } from "@/lib/auditLog"
import { queryFormSchema } from "@/app/components/forms/AddQueryForm"
import prisma from "@/lib/db"
import { requireAdmin, requireQueryEditor } from "@/lib/authGuard"
import { invalidateReportCatalogue } from "@/lib/reportCatalogue"
import { queryCache } from "@/lib/queryCache"

export async function addQuery(values: z.infer<typeof queryFormSchema>) {
  const actor = await requireQueryEditor()
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
        totalColumns: values.totalColumns || null,
        chart: values.chart,
        chartTypeKey: values.chartTypeKey,
        chartStackKey: values.chartStackKey,
        chartXKey: values.chartXKey,
        chartYKey: values.chartYKey,
        categoryId: values.categoryId,
      },
    })
    invalidateReportCatalogue()
    await recordAudit({
      actor,
      action: "query.create",
      entity: "Query",
      entityId: result.id,
      after: { name: result.name, label: result.label, categoryId: result.categoryId },
    })

    return true
  } catch (error) {
    console.error("Error creating query:", error)
    throw error
  }
}

const auditedQueryFields = {
  id: true, name: true, categoryId: true, description: true, query: true, chart: true,
  chartXKey: true, chartYKey: true, chartTypeKey: true, chartStackKey: true,
  hiddenCols: true, totalColumns: true, publicQuery: true,
} as const

export async function updateQuery(id: string, data: EditableQueryFields) {
  const actor = await requireQueryEditor()
  if (typeof id !== "string" || !id) throw new Error("Query id is required")
  const parsed = editableQueryFields.parse(data)
  const before = await prisma.query.findUnique({ where: { id }, select: auditedQueryFields })
  const updated = await prisma.query.update({
    where: { id },
    data: {
      ...parsed,
      // an empty category selection means "no category"
      categoryId: parsed.categoryId === "" ? null : parsed.categoryId,
      totalColumns: parsed.totalColumns === "" ? null : parsed.totalColumns,
    },
  })
  // Cached rows may belong to the old SQL; the header/sidebar catalogue may be stale (P4, P8)
  queryCache.clear()
  invalidateReportCatalogue()
  const after = Object.fromEntries(Object.keys(auditedQueryFields).map((k) => [k, (updated as any)[k]]))
  await recordAudit({ actor, action: "query.update", entity: "Query", entityId: id, before, after })
  return updated
}

// UPDATED: Improved updateUser function with better handling of many-to-many relationships
async function updateUserImpl(data: any, field: string) {
  await requireAdmin();

  try {
    if (field === "User") {
      // Update the user, schools, and roles atomically so a concurrent sign-in
      // can't interleave a half-applied delete-then-recreate.
      await prisma.$transaction(async (tx) => {
        await tx.user.update({
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
          await tx.userRole.deleteMany({ where: { userId: data.id } });
          if (data.userRoleIds.length > 0) {
            await tx.userRole.createMany({
              data: data.userRoleIds.map((roleId: string) => ({
                userId: data.id,
                roleId,
              })),
              skipDuplicates: true,
            });
          }
        }
      });
    }
    else if (field === "User Roles") {
      // Replace roles atomically.
      await prisma.$transaction(async (tx) => {
        await tx.userRole.deleteMany({ where: { userId: data.id } });
        if (data.userRoleIds?.length > 0) {
          await tx.userRole.createMany({
            data: data.userRoleIds.map((roleId: string) => ({
              userId: data.id,
              roleId,
            })),
            skipDuplicates: true,
          });
        }
      });
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

async function addQueryCategoryImpl(data: { label: string; value: string; sort?: number; roleIds?: string[] }) {
  await requireQueryEditor()
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

async function updateQueryCategoryImpl(data: { id: string; label?: string; value?: string; sort?: number; roleIds?: string[] }) {
  await requireQueryEditor()
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

async function deleteQueryCategoryImpl(id: string) {
  await requireQueryEditor()
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

// Category changes alter the header/sidebar catalogue (finding P4).
export async function addQueryCategory(...args: Parameters<typeof addQueryCategoryImpl>) {
  const actor = await requireQueryEditor()
  const result = await addQueryCategoryImpl(...args)
  invalidateReportCatalogue()
  await recordAudit({ actor, action: "category.create", entity: "QueryCategory", entityId: (result as any)?.id ?? null, after: args[0] })
  return result
}

export async function updateQueryCategory(...args: Parameters<typeof updateQueryCategoryImpl>) {
  const actor = await requireQueryEditor()
  const before = await prisma.queryCategory.findUnique({ where: { id: args[0].id }, include: { roles: { select: { role: true } } } })
  const result = await updateQueryCategoryImpl(...args)
  invalidateReportCatalogue()
  await recordAudit({ actor, action: "category.update", entity: "QueryCategory", entityId: args[0].id, before, after: args[0] })
  return result
}

export async function deleteQueryCategory(...args: Parameters<typeof deleteQueryCategoryImpl>) {
  const actor = await requireQueryEditor()
  const before = await prisma.queryCategory.findUnique({ where: { id: args[0] } })
  const result = await deleteQueryCategoryImpl(...args)
  invalidateReportCatalogue()
  await recordAudit({ actor, action: "category.delete", entity: "QueryCategory", entityId: args[0], before })
  return result
}

const auditedUserFields = {
  id: true, name: true, email: true, admin: true, queryEdit: true, primaryRole: true,
  blockedSchools: true, addedSchools: true, blockedRoles: true, addedRoles: true,
  UserRole: { select: { role: { select: { role: true } } } },
  UserSchool: { select: { schoolSc: true } },
} as const

// User changes are audited with a before/after snapshot of access-relevant fields (finding U8)
export async function updateUser(data: any, field: string) {
  const actor = await requireAdmin()
  const before = data?.id ? await prisma.user.findUnique({ where: { id: data.id }, select: auditedUserFields }) : null
  const result = await updateUserImpl(data, field)
  const after = data?.id ? await prisma.user.findUnique({ where: { id: data.id }, select: auditedUserFields }) : null
  await recordAudit({ actor, action: `user.update.${field.toLowerCase().replace(/\s+/g, "-")}`, entity: "User", entityId: data?.id ?? null, before, after })
  return result
}
