"use server";

/**
 * Role catalogue admin actions (admin Roles tab). Super admins only; every
 * change is audited. Results are returned rather than thrown so the client can
 * show the real reason (Next.js redacts thrown error messages in production).
 */
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/authGuard";
import { recordAudit } from "@/lib/auditLog";
import { getRoleRow, roleSelect, toRoleRow } from "@/lib/roleRecords";
import { isValidRoleName, normalizeRoleName, type RoleRow } from "@/lib/roles";

export type RoleActionResult = { ok: true; role: RoleRow } | { ok: false; error: string };
export type RoleDeleteResult = { ok: true } | { ok: false; error: string };

const NAME_RULE = "Use 2 to 40 upper-case letters, digits or underscores, starting with a letter.";

function cleanText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function createRole(input: {
  role: string;
  label?: string;
  description?: string;
}): Promise<RoleActionResult> {
  const actor = await requireAdmin();
  const role = normalizeRoleName(cleanText(input.role, 80));
  if (!isValidRoleName(role)) {
    return { ok: false, error: `"${role || input.role}" is not a valid role name. ${NAME_RULE}` };
  }
  const label = cleanText(input.label, 191) || role;
  const description = cleanText(input.description, 2000) || null;

  if (await prisma.role.findUnique({ where: { role }, select: { id: true } })) {
    return { ok: false, error: `A role named ${role} already exists.` };
  }

  const created = await prisma.role.create({
    data: { role, label, description, isSystem: false },
    select: roleSelect,
  });
  await recordAudit({
    actor,
    action: "role.create",
    entity: "Role",
    entityId: created.id,
    after: { role, label, description },
  });
  return { ok: true, role: toRoleRow(created) };
}

export async function updateRole(input: {
  id: string;
  label?: string;
  description?: string;
}): Promise<RoleActionResult> {
  const actor = await requireAdmin();
  const before = await getRoleRow(input.id);
  if (!before) return { ok: false, error: "That role no longer exists." };

  const label = cleanText(input.label, 191) || before.role;
  const description = cleanText(input.description, 2000) || null;

  const updated = await prisma.role.update({
    where: { id: input.id },
    data: { label, description },
    select: roleSelect,
  });
  await recordAudit({
    actor,
    action: "role.update",
    entity: "Role",
    entityId: input.id,
    before: { role: before.role, label: before.label, description: before.description },
    after: { role: before.role, label, description },
  });
  return { ok: true, role: toRoleRow(updated) };
}

/**
 * Delete a data role. System roles and roles still attached to a user, a
 * user's primary role, a category or a report are refused; the schema's
 * foreign keys enforce the same rule underneath.
 */
export async function deleteRole(id: string): Promise<RoleDeleteResult> {
  const actor = await requireAdmin();
  const row = await getRoleRow(id);
  if (!row) return { ok: false, error: "That role no longer exists." };
  if (row.isSystem) {
    return { ok: false, error: `${row.role} is a system role the application depends on and cannot be deleted.` };
  }
  const inUse: string[] = [];
  if (row.userCount > 0) inUse.push(`${row.userCount} user(s)`);
  if (row.primaryUserCount > 0) inUse.push(`${row.primaryUserCount} user(s) as their primary role`);
  if (row.categoryCount > 0) inUse.push(`${row.categoryCount} categor${row.categoryCount === 1 ? "y" : "ies"}`);
  if (row.queryCount > 0) inUse.push(`${row.queryCount} report(s)`);
  if (inUse.length > 0) {
    return { ok: false, error: `${row.role} is still assigned to ${inUse.join(", ")}. Remove those assignments first.` };
  }

  await prisma.role.delete({ where: { id } });
  await recordAudit({
    actor,
    action: "role.delete",
    entity: "Role",
    entityId: id,
    before: { role: row.role, label: row.label, description: row.description },
  });
  return { ok: true };
}
