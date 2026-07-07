import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-6">
      <div className="bg-card w-full max-w-md rounded-lg border p-6 text-center shadow-sm">
        <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <FileQuestion className="text-muted-foreground h-6 w-6" />
        </div>
        <h1 className="mb-2 text-xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
