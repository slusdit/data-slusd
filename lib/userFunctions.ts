'use server'
import { auth, SessionUser } from "@/auth";
import prisma from "./db";

export async function toggleFavorite(user: SessionUser, queryId: string) {
    const userWithFavorites = await prisma.user.findUnique({
      where: { id: user.id },
      select: { favorites: true }
    });
  
    const hasFavorite = userWithFavorites?.favorites.some(q => q.id === queryId);
  
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          [hasFavorite ? 'disconnect' : 'connect']: { id: queryId }
        }
      }
    });
    const newUser = await auth();
    console.log({newUser})
  }