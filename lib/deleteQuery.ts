'use server';

import prisma from "./db";
import { requireQueryEditor } from "./authGuard";
import { invalidateReportCatalogue } from "./reportCatalogue";
import { queryCache } from "./queryCache";

export async function deleteQuery(id: string) {
  await requireQueryEditor();
  try {
    await prisma.query.delete({ where: { id } });
    queryCache.clear();
    invalidateReportCatalogue();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
