'use client'

import { SchoolInfo } from "@prisma/client"
import { useEffect } from "react"
import Image from "next/image"

const ActiveSchool = ({ activeSchool }: { activeSchool: SchoolInfo }) => {

    return (
        <div className="flex flex-row items-center">
            <div >
                <Image src={activeSchool.logo ?? '/logos/slusd-logo.png'}
                    width={50}
                    height={50}
                    alt="School Logo"
                    className="mr-2"
                />
            </div>
            <div className="text-mainTitle-foreground ">


                {activeSchool.name}

            </div>
        </div>
    )
}

export default ActiveSchool