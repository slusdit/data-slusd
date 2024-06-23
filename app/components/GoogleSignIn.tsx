import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
 
export function SignIn() {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google", {
            redirectTo: "/profile",
          })
        }}
      >
        <Button 
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        type="submit"
        
        >Sign in</Button>
      </form>
    )
  }