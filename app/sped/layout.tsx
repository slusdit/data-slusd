import { auth } from "@/auth";
import { userCanUploadIep } from "@/lib/authorization";
import UnauthorizedButton from "../components/UnauthorizedButton";
import AccessDenied from "../components/AccessDenied";

export default async function SpedLayout({
    children,
  }: Readonly<{
      children: React.ReactNode;
  }>) {
    const session = await auth()

    // SPED, IEPUPLOAD, or admin (finding S17: IEPUPLOAD was never admitted)
    if (!userCanUploadIep(session?.user)) {
      return <AccessDenied />;
    }

    return (
        <div>
            {session ? children :
                  <UnauthorizedButton
                    home
                  />
                }
        </div>
    );
  }
