import BackButton from "@/app/components/BackButton";
import { auth, SessionUser } from "@/auth";
import { runParameterizedQuery } from "@/lib/aeries";
import { redirect } from "next/navigation";
import mssql from "mssql";

export default async function StudentDemoPage(
  props: {
      params: Promise<{ id: string; sc: string }>
    }
) {
  const params = await props.params;

  const {
    id,
    sc
  } = params;

  const session = await auth();
  const user = session?.user as SessionUser | undefined;
  if (!user) {
    redirect("/");
  }

  // Enforce that the viewer may access this student's school.
  const schools = user.schools ?? [];
  if (!user.admin && !schools.includes(String(sc))) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-card rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You do not have access to student records for this school.
          </p>
          <BackButton />
        </div>
      </div>
    );
  }

  // Parameterized query — never interpolate route params into SQL.
  const query = `select * from stu where sc = @sc and id = @id and del = 0 and tg = ''`;
  const data = await runParameterizedQuery(query, {
    sc: { type: mssql.VarChar, value: sc },
    id: { type: mssql.VarChar, value: id },
  });

  const student = data?.[0];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-card rounded-lg shadow-lg p-6">
          <BackButton />
          <h1 className="text-2xl font-bold mb-4 text-center">Student Details</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Student ID</p>
              <p className="text-lg font-semibold">{id}</p>
            </div>

            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">{student?.LN}, {student?.FN}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Grade</p>
              <p className="text-lg font-semibold">{student?.GR}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Parent / Guardian</p>
              <p className="text-lg font-semibold">{student?.PG}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Birth Date</p>
              <p className="text-lg font-semibold">{student?.BD?.toLocaleDateString('en-US')}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-lg font-semibold">{student?.TL?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
            </div>
          </div>
        </div>
    </div>
  );
}