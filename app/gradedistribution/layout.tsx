import { auth } from "@/auth";
import UnauthorizedButton from "../components/UnauthorizedButton";

export default async function GradedistributionLayout({
    children,

  }: Readonly<{
      children: React.ReactNode;
      
  }>) {
    // const session = await serverAuth()
    const session = await auth()
    const userRoles = session?.user?.roles
    console.log(userRoles)

    if (!userRoles?.some(role => ["GRADEDISTRIBUTION", "SUPERADMIN"].includes(role))) {
      return (
        <div>
          Unauthorized, please go back
        </div>
      );
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
  