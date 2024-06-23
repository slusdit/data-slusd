import Link from "next/link"
import LoginButton from "./LoginButton"
import { ROLE } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, XOctagon } from "lucide-react"
import { SignIn } from "./GoogleSignIn"

type Role = {
  adminRoles: ROLE[]
  authorizedRoles: ROLE[]
}

const UnauthorizedButton = ({
  signIn,
  home,
  role,
}: {
  signIn?: boolean,
  home?: boolean,
  role?: Role,

}) => {

  return (
    <div className="flex">
      {home &&
        <div className="flex-col text-center m-auto mt-10 rounded-lg place-content-center">
          <div className="text-xl font-weight-800 mb-5">
            Welcome to SLUSD Data 2.0! <br />
            Please sign in.
          </div>
          <LoginButton user={null} />
        </div>
      }
      {signIn &&
        <div className="m-auto mt-10 self-center rounded-lg bg-danger-200 hover:bg-danger-100 text-white">
         <SignIn />
        </div>
      }
      {role &&
        <div
          className="m-auto mt-10 self-center rounded-lg"
        >
          <div className='flex h-10 text-xl justify-between w-56'>
            <AlertTriangle color="hsl(var(--warning))" />
            <p className="font-bold">Unauthorized!</p>
            <AlertTriangle color="hsl(var(--warning))" />
          </div>
          <p>Must be have role: {role.authorizedRoles.filter(e => !role.adminRoles.includes(e)).join(', ')}</p>
          <Button asChild variant="link" className="font-bold">
            <Link href={'/'}>
              Home
            </Link>
          </Button>
        </div>
      }
    </div>
  )
}

export default UnauthorizedButton