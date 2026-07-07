import { ClipboardList } from "lucide-react";

export default function AssessmentPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Assessment</h1>
      <div className="bg-card flex flex-col items-center justify-center rounded-lg border p-12 text-center">
        <div className="bg-muted mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <ClipboardList className="text-muted-foreground h-7 w-7" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Coming soon</h2>
        <p className="text-muted-foreground max-w-md text-sm">
          The assessment dashboard is under development. It isn&apos;t connected to
          live data yet — check back later.
        </p>
      </div>
    </div>
  );
}
