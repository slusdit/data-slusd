import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";

// const prisma = new PrismaClient();
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        console.log('~~~~~~~~~~~~ SIGNING IN WITH GOOGLE ~~~~~~~~~~~~')
        const profileEmail = profile?.email 
        console.log({profileEmail})
        console.log(profile?.email_verified && profile?.email?.endsWith("@slusd.us"  ) )
        return profile?.email_verified && profile?.email?.endsWith("@slusd.us") 
      }

      return true;
    },
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          userRole: true,
          school: true,
        }, // Include roles if needed
      });
      session.user.admin = dbUser?.admin
      session.user.schools = dbUser?.school.map((school) => school.sc) || [];
      session.user.roles = dbUser?.userRole.map((role) => role.role) || [];
      return session;
    },
  },
});
