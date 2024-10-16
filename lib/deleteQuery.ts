'use server';

import prisma from "./db";


export async function deleteQuery(id: string) {
    console.log("deleteQuery", id)
    try { 
      const deleteRecord = await prisma.query.delete({ where: { id: id.id } })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }