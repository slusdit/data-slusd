'use server'

import { auth } from "@/auth"
import prisma from "./db"

export default async function getActiveSchoolInfo() {

    const session = await auth()
    const activeSchool = session?.user?.activeSchool?.toString()
    const schoolInfo = await prisma.schoolInfo.findUnique({
        where: {
          sc: session?.user?.activeSchool.toString()
        }
      })
    console.log(schoolInfo)
    return schoolInfo

}