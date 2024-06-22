
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
 
export function SignOut() {
    return (
        <form
          action={async () => {
            await signOut()
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      )
  }