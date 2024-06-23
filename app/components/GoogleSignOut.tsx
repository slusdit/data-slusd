"use server"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"


export async function SignOutGoogle() {

  await signOut({redirectTo: "/"});
}
export async function SignOut() {
  return (
    <form
      action={SignOutGoogle}
      
      >
      <Button 
      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      type="submit"
      >Sign Out</Button>
    </form>
  )
}