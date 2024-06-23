import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo: "/"});
      }}
      >
      <Button 
      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      type="submit"
      >Sign Out</Button>
    </form>
  )
}