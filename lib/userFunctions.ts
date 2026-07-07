'use server'
import prisma from "./db";
import { requireUser } from "./authGuard";

export async function toggleFavorite(_user: unknown, queryId: string) {
  // Ignore any caller-supplied user; always act on the authenticated session user.
  const sessionUser = await requireUser();

  const userWithFavorites = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { favorites: true }
  });

  const hasFavorite = userWithFavorites?.favorites.some(q => q.id === queryId);

  await prisma.user.update({
    where: { id: sessionUser.id },
    data: {
      favorites: {
        [hasFavorite ? 'disconnect' : 'connect']: { id: queryId }
      }
    }
  });

  return { success: true, favorited: !hasFavorite };
}
