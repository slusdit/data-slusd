"use client";

/**
 * Read-only view of the admin audit log (finding U8), super admins only.
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface AuditEntry {
  id: string;
  createdAt: string | Date;
  actorId: string;
  actorEmail: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  before: unknown;
  after: unknown;
}

function Snapshot({ label, value }: { label: string; value: unknown }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <pre className="max-h-64 overflow-auto rounded-sm bg-muted p-2 text-xs whitespace-pre-wrap break-words">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
}

export default function AuditLogPanel({ entries }: { entries: AuditEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>
          The most recent {entries.length} changes to reports, categories, users and AI fragments made
          through the admin tools. Emulation has its own log.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No changes recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="w-8 p-2" />
                  <th className="p-2">When</th>
                  <th className="p-2">Who</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Entity</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const isOpen = openId === entry.id;
                  const name =
                    (entry.after as { name?: string } | null)?.name ??
                    (entry.before as { name?: string } | null)?.name ??
                    entry.entityId ??
                    "";
                  return (
                    <>
                      <tr key={entry.id} className="border-b align-top">
                        <td className="p-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            aria-label={isOpen ? "Hide details" : "Show details"}
                            aria-expanded={isOpen}
                            onClick={() => setOpenId(isOpen ? null : entry.id)}
                          >
                            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                        </td>
                        <td className="p-2 whitespace-nowrap">{new Date(entry.createdAt).toLocaleString()}</td>
                        <td className="p-2">{entry.actorEmail ?? entry.actorId}</td>
                        <td className="p-2">
                          <Badge variant="outline">{entry.action}</Badge>
                        </td>
                        <td className="p-2">
                          <span className="font-medium">{entry.entity}</span>
                          {name && <span className="text-muted-foreground"> · {name}</span>}
                        </td>
                      </tr>
                      {isOpen && (
                        <tr key={`${entry.id}-details`} className="border-b bg-muted/30">
                          <td />
                          <td colSpan={4} className="p-3">
                            <div className="grid gap-3 md:grid-cols-2">
                              <Snapshot label="Before" value={entry.before} />
                              <Snapshot label="After" value={entry.after} />
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
