import { Loader2 } from "lucide-react";

// Streams immediately while the report SQL runs against Aeries (finding P9).
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" aria-label="Loading report" />
        <p className="text-muted-foreground text-sm">Running report…</p>
      </div>
    </div>
  );
}
