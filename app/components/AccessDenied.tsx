import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

/**
 * Consistent access-denied state for role-gated layouts, matching the
 * /admin "Access Denied" card instead of a bare unstyled div.
 */
export default function AccessDenied({
  message = "You do not have permission to view this page.",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-6">
      <div className="bg-card w-full max-w-md rounded-lg border p-6 text-center shadow-sm">
        <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <ShieldAlert className="text-destructive h-6 w-6" />
        </div>
        <h1 className="mb-2 text-xl font-semibold">Access denied</h1>
        <p className="text-muted-foreground mb-6 text-sm">{message}</p>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
