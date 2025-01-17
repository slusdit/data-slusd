export default async function StudentDemoPage({
    params: { id, sc }
  }: {
    params: { id: string; sc: string }
  }) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Student Details</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">School Code</p>
              <p className="text-lg font-semibold">{sc}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Student ID</p>
              <p className="text-lg font-semibold">{id}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }