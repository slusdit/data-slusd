import { auth } from "@/auth";
import { userCanUploadRfep } from "@/lib/authorization";
import AccessDenied from "../components/AccessDenied";

// English Learner tools: RFEPUPLOAD or admin.
export default async function ElLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!userCanUploadRfep(session?.user)) {
    return <AccessDenied />;
  }

  return <div>{children}</div>;
}
