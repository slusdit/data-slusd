"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

/**
 * Shared error-boundary UI. Route-level error.tsx files render this so every
 * route surfaces a consistent, recoverable error state instead of Next's
 * default full-screen crash.
 */
export default function ErrorState({
  error,
  reset,
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this page. You can try again, and if the problem persists, contact support.",
}: {
  error: Error & { digest?: string };
  reset?: () => void;
  title?: string;
  description?: string;
}) {
  useEffect(() => {
    // Surface the error for observability; details are never shown to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center p-6">
      <div className="bg-card w-full max-w-md rounded-lg border p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h1 className="mb-2 text-xl font-semibold">{title}</h1>
        <p className="text-muted-foreground mb-6 text-sm">{description}</p>
        <div className="flex justify-center gap-3">
          {reset && (
            <Button onClick={() => reset()} variant="default">
              Try again
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go home
          </Button>
        </div>
        {error?.digest && (
          <p className="text-muted-foreground/60 mt-4 text-xs">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
