import { Loader2 } from "lucide-react";

// Streams immediately while the AI query page loads its school list (finding P9).
export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" aria-label="Loading AI query" />
        <p className="text-muted-foreground text-sm">Loading AI query…</p>
      </div>
    </div>
  );
}
