
'use server'

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function startEmulation() {
  const session = await auth()
  
  if (!session?.user?.roles?.includes('ADMIN') && !session?.user?.roles?.includes('SUPERADMIN')) {
    throw new Error('Unauthorized')
  }
  console.log(session.user)
  try {
   const result =  await prisma.user.update({
      where: { id: session.user.id },
      data: {
        emulatedUserId: 'cm73n2pf60004hz1rsv056ri8',
        emulatedUserEmail: 'jalmendarez@slusd.us',
      },
   })
      
      console.log(result)
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Emulation error:', error)
    throw new Error('Failed to start emulation')
  }
}

export async function stopEmulation() {
  const session = await auth()
  
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        emulatedUserId: null,
        emulatedUserEmail: null,
      },
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error clearing emulation:', error)
    throw new Error('Failed to clear emulation')
  }
}

