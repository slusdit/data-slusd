'use client'

import { SchoolInfo } from "@prisma/client"
import { useEffect } from "react"
import Image from "next/image"

const ActiveSchool = ({ activeSchool }: { activeSchool: SchoolInfo }) => {

    return (
        <div className="flex flex-row ">
            <Image src={activeSchool.logo ?? '/logos/slusd-logo.png'} 
            width={60} 
            height={60} 
            alt="School Logo" 
            className="mr-2"/>
            <div className="text-mainTitle-foreground flex items-center">
                

                {activeSchool.name}
                
                </div>
            </div>
    )
}

export default ActiveSchool