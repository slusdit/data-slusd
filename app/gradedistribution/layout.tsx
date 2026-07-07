import { auth } from "@/auth";
import UnauthorizedButton from "../components/UnauthorizedButton";
import AccessDenied from "../components/AccessDenied";

export default async function GradedistributionLayout({
    children,

  }: Readonly<{
      children: React.ReactNode;

  }>) {
    const session = await auth()
    const userRoles = session?.user?.roles

    if (!userRoles?.some(role => ["GRADEDISTRIBUTION", "SUPERADMIN", "PRINCIPAL"].includes(role))) {
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
  