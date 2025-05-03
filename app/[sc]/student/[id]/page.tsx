import BackButton from "@/app/components/BackButton";
import { auth } from "@/auth";
import { runQuery } from "@/lib/aeries";

export default async function StudentDemoPage({
    params: { id, sc }
  }: {
    params: { id: string; sc: string }
  }) {
  
  const session = await auth()
  const sql = `select * from stu where sc = '${sc}' and id = '${id}' and del = 0 and tg = ''`
  console.log(sql)
  const data = await runQuery(sql)  
  console.log(data)
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
              <p className="text-lg font-semibold">{data[0]?.LN}, {data[0]?.FN}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Grade</p>
              <p className="text-lg font-semibold">{data[0]?.GR}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Parent / Guardian</p>
              <p className="text-lg font-semibold">{data[0]?.PG}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Enter Date</p>
              <p className="text-lg font-semibold">{data[0]?.BD.toLocaleDateString('en-US')}</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-lg font-semibold">{data[0]?.TL?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }