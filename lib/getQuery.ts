'use server'
import { runQuery } from "./aeries"
import prisma from "./db"

export async function getQuery(queryId:string){
  
    console.log(queryId)
    const ret = await prisma.query.findUnique({
      where: {
        id: queryId
      },
      include: {
        category: true
      }
    })
    
    return ret
  }

export async function getQueryData({queryId, queryLabel}:{ queryId?: string, queryLabel?: string}) {
  console.log({queryId, queryLabel})
  let query
  if (queryId) { 
  query = await prisma.query.findUnique({
    where: {
      id: queryId
    },
    include: {
      category: true
    }
  })
  }
  if (queryLabel) {
    query = await prisma.query.findUnique({
      where: {
        label: queryLabel
      },
      include: {
        category: true
      }
    })
  }
    console.log(query)
    if (!query) return
    const data = await runQuery(query.query)
    return {
      data:data,
      query:query
    }
}