import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div
      className="m-auto mt-10 self-center rounded-lg bg-success-200 hover:bg-success-100"
    >
      <h1 className="text-xl font-weight-800 mb-5">
        Logged in
      </h1>
      <ul className="flex flex-col gap-1 w-2/3">
        
        {session?.user?.admin &&
          <li><Link href="/admin" className="hover:underline">Admin</Link></li>
        }

        <li><Link href="/profile" className="hover:underline">Profile</Link></li>

      </ul>
    </div>
  );
}
