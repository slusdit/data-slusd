import { Loader2 } from "lucide-react";

// Root loading UI cascades to every route, so keep it layout-agnostic:
// a neutral centered spinner rather than a skeleton that mimics one page.
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" aria-label="Loading" />
    </div>
  );
}
