import { auth } from "@/auth";
import UnauthorizedButton from "../components/UnauthorizedButton";
import AccessDenied from "../components/AccessDenied";

export default async function AssessmentLayout({
    children,

  }: Readonly<{
      children: React.ReactNode;
      
  }>) {
    const session = await auth()
    const userRoles = session?.user?.roles

    if (!userRoles?.some(role => ["ASSESSMENT", "SUPERADMIN"].includes(role))) {
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
  