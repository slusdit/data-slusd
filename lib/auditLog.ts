import "server-only";

/**
 * Admin audit log (finding U8). Every mutation of a report, category, user or
 * AI fragment made through the admin tools records who did it and the
 * before/after snapshot. Writes never throw: an audit failure must not undo
 * the change it describes, so it is logged instead.
 */
import prisma from "./db";

export type AuditEntity = "Query" | "QueryCategory" | "User" | "AIFragment";

export interface AuditInput {
  actor: { id: string; email?: string | null };
  /** dotted verb, e.g. "query.update", "user.delete" */
  action: string;
  entity: AuditEntity;
  entityId?: string | null;
  before?: unknown;
  after?: unknown;
}

/** Strip anything that should not sit in the log (SQL text is kept; secrets are not stored on these models). */
function toJson(value: unknown): object | undefined {
  if (value === undefined || value === null) return undefined;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return { unserializable: true };
  }
}

export async function recordAudit(input: AuditInput): Promise<void> {
  try {
    await prisma.adminAuditLog.create({
      data: {
        actorId: input.actor.id,
        actorEmail: input.actor.email ?? null,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId ?? null,
        before: toJson(input.before),
        after: toJson(input.after),
      },
    });
  } catch (error) {
    console.error(`[audit] failed to record ${input.action} on ${input.entity} ${input.entityId ?? ""}:`, error);
  }
}
