'use server'
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"

export async function SignInGoogle() {
  await signIn("google", {
    redirectTo: "/",
  })
}
 
export async function SignIn() {
    return (
      <form
        action={SignInGoogle}
      >
        <Button 
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        type="submit"
        
        >Sign in</Button>
      </form>
    )
  }