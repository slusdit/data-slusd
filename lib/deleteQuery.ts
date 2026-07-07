'use server';

import prisma from "./db";
import { requireQueryEditor } from "./authGuard";

export async function deleteQuery(id: string) {
  await requireQueryEditor();
  try {
    await prisma.query.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
