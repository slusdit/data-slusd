import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";
import syncTeacherClasses from "./lib/teacherClassMiddleware";

// const prisma = new PrismaClient();
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        console.log('~~~~~~~~~~~~ SIGNING IN WITH GOOGLE ~~~~~~~~~~~~')
        let profileEmail = profile?.email
        // profileEmail =  'jfox@slusd.us'//xbugarin@slusd.us' // !! Override for testing
        const session = await auth()
        const profileId = session?.user?.id
        console.log({ profileEmail })
        console.log({ profileId })
        if (profileId && profileEmail) {
          const result = await syncTeacherClasses(profileId, profileEmail)
          console.log({ result })
        }

        console.log({ profileEmail })
        console.log(profile?.email_verified && profile?.email?.endsWith("@slusd.us"))
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
          UserClass: {
            include: {
              class: true,
            },
          },
        }, // Include roles if needed
      });
      // @ts-ignore
      session.user.admin = dbUser?.admin
      // @ts-ignore
      session.user.schools = dbUser?.school.map((school) => school.sc) || [];
      // @ts-ignore
      session.user.roles = dbUser?.userRole.map((role) => role.role) || [];
      // @ts-ignore
      session.user.classes = dbUser?.UserClass.map((userClass) => userClass.class) || [];
      return session;
    },
  },
});
