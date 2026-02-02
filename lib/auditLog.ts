/**
 * Audit logging utility for tracking security-sensitive actions
 */

import prisma from '@/lib/db';
import { AuditAction, AuditStatus } from '@prisma/client';

export interface AuditLogEntry {
  userId: string;
  userEmail: string;
  action: AuditAction;
  resource?: string;
  resourceType?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  status?: AuditStatus;
  errorMessage?: string;
}

/**
 * Extract IP address from request headers
 */
export function getIpAddress(request: Request): string | undefined {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return undefined;
}

/**
 * Create an audit log entry
 * @param entry - Audit log entry data
 * @returns Promise that resolves when the log is saved
 */
export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        userEmail: entry.userEmail,
        action: entry.action,
        resource: entry.resource,
        resourceType: entry.resourceType,
        details: entry.details ? JSON.stringify(entry.details) : undefined,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        status: entry.status || AuditStatus.SUCCESS,
        errorMessage: entry.errorMessage,
      },
    });

    // Log to console for immediate visibility
    const logLevel = entry.status === AuditStatus.FAILURE ? 'warn' : 'info';
    console[logLevel]('[AUDIT]', {
      user: entry.userEmail,
      action: entry.action,
      resource: entry.resource,
      status: entry.status || 'SUCCESS',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Don't fail the main operation if audit logging fails
    console.error('[AUDIT] Failed to create audit log:', error);
  }
}

/**
 * Log emulation start
 */
export async function logEmulationStart(
  adminId: string,
  adminEmail: string,
  targetUserId: string,
  targetUserEmail: string,
  request: Request
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    userEmail: adminEmail,
    action: AuditAction.EMULATION_START,
    resource: targetUserId,
    resourceType: 'user',
    details: {
      targetUserEmail,
      targetUserId,
    },
    ipAddress: getIpAddress(request),
    userAgent: request.headers.get('user-agent') || undefined,
    status: AuditStatus.SUCCESS,
  });
}

/**
 * Log emulation stop
 */
export async function logEmulationStop(
  adminId: string,
  adminEmail: string,
  request: Request
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    userEmail: adminEmail,
    action: AuditAction.EMULATION_STOP,
    resourceType: 'user',
    ipAddress: getIpAddress(request),
    userAgent: request.headers.get('user-agent') || undefined,
    status: AuditStatus.SUCCESS,
  });
}

/**
 * Log failed emulation attempt
 */
export async function logEmulationFailure(
  adminId: string,
  adminEmail: string,
  targetUserId: string,
  error: string,
  request: Request
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    userEmail: adminEmail,
    action: AuditAction.EMULATION_START,
    resource: targetUserId,
    resourceType: 'user',
    ipAddress: getIpAddress(request),
    userAgent: request.headers.get('user-agent') || undefined,
    status: AuditStatus.FAILURE,
    errorMessage: error,
  });
}

/**
 * Query audit logs with filtering
 */
export async function getAuditLogs(filters?: {
  userId?: string;
  action?: AuditAction;
  startDate?: Date;
  endDate?: Date;
  status?: AuditStatus;
  limit?: number;
}) {
  const where: any = {};

  if (filters?.userId) {
    where.userId = filters.userId;
  }

  if (filters?.action) {
    where.action = filters.action;
  }

  if (filters?.status) {
    where.status = filters.status;
  }

  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      where.createdAt.gte = filters.startDate;
    }
    if (filters.endDate) {
      where.createdAt.lte = filters.endDate;
    }
  }

  return prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: filters?.limit || 100,
  });
}
