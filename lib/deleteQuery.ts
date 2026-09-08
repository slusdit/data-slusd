'use server';

import prisma from "./db";
import { requireQueryEditor } from "./authGuard";
import { invalidateReportCatalogue } from "./reportCatalogue";
import { queryCache } from "./queryCache";
import { recordAudit } from "./auditLog";

export async function deleteQuery(id: string) {
  const actor = await requireQueryEditor();
  try {
    const before = await prisma.query.findUnique({
      where: { id },
      select: { id: true, name: true, label: true, categoryId: true, query: true },
    });
    await prisma.query.delete({ where: { id } });
    await recordAudit({ actor, action: "query.delete", entity: "Query", entityId: id, before });
    queryCache.clear();
    invalidateReportCatalogue();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
