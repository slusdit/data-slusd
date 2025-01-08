"use server";
import { runQuery } from "./aeries";
import prisma from "./db";

export async function getQuery(queryId: string) {
  // console.log(queryId);
  const ret = await prisma.query.findUnique({
    where: {
      id: queryId,
    },
    include: {
      category: true,
    },
  });

  return ret;
}

export async function getQueryData({
  queryId,
  queryLabel,
}: {
  queryId?: string;
  queryLabel?: string;
}) {
  async function fetchQuery({
    queryId,
    queryLabel,
  }: {
    queryId?: string;
    queryLabel?: string;
  }) {
    // Add validation to ensure queryId is a string
    if (queryId && typeof queryId === 'string') {
      return await prisma.query.findUnique({
        where: {
          id: queryId // This should be just the string ID
        },
        include: {
          category: {
            include: {
              queries: true,
            }
          },
        },
      });
    }
    if (queryLabel) {
      return await prisma.query.findUnique({
        where: {
          label: queryLabel,
        },
        include: {
          category: true,
        },
      });
    }
  }

  const query = await fetchQuery({ queryId, queryLabel });
  
  if (!query) return;
  const data = await runQuery(query.query);
  
  return {
    data: data,
    query: query,
  };
}

  