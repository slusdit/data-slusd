
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { auth } from "@/auth";

export default async function MainFooter(){
    
    const session = await auth()
    console.log(session?.user?.admin)
    return (

    <footer className="bottom-0 left-0  w-full fixed ">
        <div className="  m-auto bg-title justify-end flex align-middle h-10">
      {
          session?.user?.admin && 
          
          <Link
          className="text-primary px-4 py-2"
          href="/admin"
          >
                                Admin
                            </Link>
                       
                    }
                    </div>
      </footer>
)}

