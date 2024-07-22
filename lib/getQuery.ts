'use server'
import { runQuery } from "./aeries"
import prisma from "./db"

export async function getQuery(queryId:string){
  
    console.log(queryId)
    const ret = await prisma.query.findUnique({
      where: {
        id: queryId
      }
    })
    
    return ret
  }

export async function getQueryData(queryId:string){
    const query = await getQuery(queryId)
    console.log(query)
    if (!query) return
    const response = await runQuery(query.query)
    return response
}