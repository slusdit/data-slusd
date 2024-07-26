"use server";
import { runQuery } from "./aeries";
import prisma from "./db";

export async function getQuery(queryId: string) {
  console.log(queryId);
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
  console.log({ queryId, queryLabel });
  async function fetchQuery({
    queryId,
    queryLabel,
  }: {
    queryId?: string;
    queryLabel?: string;
  }){
    if (queryId) {
      return await prisma.query.findUnique({
        where: {
          id: queryId,
        },
        include: {
          category: true,
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
  };

  const query = await fetchQuery({ queryId, queryLabel });

  console.log(query);
  if (!query) return;
  const data = await runQuery(query.query);
  return {
    data: data,
    query: query,
  };
}
