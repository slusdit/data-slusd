
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { auth } from "@/auth";

export default async function MainFooter(){
    
    const session = await auth()
    console.log(session?.user?.admin)
    return (

    <footer className="bottom-0 left-0  w-full fixed">
        <div className="w-11/12 mx-auto bg-title justify-end flex align-middle h-10">
      {
          session?.user?.admin && 
          
          <Link
          className="text-primary p-2"
          href="/admin"
          >
                                Admin
                            </Link>
                       
                    }
                    </div>
      </footer>
)}

