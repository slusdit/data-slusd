'use client'
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

const MainFooter = () => {
    const {data:session} = useSession()
    return (
    <footer className="justify-end flex w-full bottom-0 bg-secondary fixed h-10">
      {/* {
      // @ts-ignore
      session?.user?.role.includes("SUPERADMIN") && 
                        <Button asChild variant="link" className="text-muted-foreground">
                            <Link
                                className="md:p-4 py-2 text-muted"
                                href="/admin"
                            >
                                Admin
                            </Link>
                        </Button>
                    } */}
      </footer>
)}

export default MainFooter