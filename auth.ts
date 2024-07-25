import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";
import syncTeacherClasses from "./lib/teacherClassMiddleware";
import { Class, ROLE, SchoolInfo, User } from "@prisma/client";
import { AeriesSimpleTeacher } from "./lib/aeries";

async function getSchools({
  schools,
  manualSchool,
  classes,
}: {
  schools:SchoolInfo[]
  manualSchool?: number | null
  classes?: Class[] | null
}) {
  
  let schoolsSc:string[] = schools.length > 0 ? schools.map((school) => school.sc) : []
  
  if (manualSchool) {
    schoolsSc = Array.from(new Set([...schoolsSc, manualSchool.toString()])) 
  }
  
  if (classes) {
    const assignedClassesSc = classes.map((classObj) => classObj.sc.toString())
    schoolsSc = Array.from(new Set([...schoolsSc, ...assignedClassesSc])) 
  }

  return schoolsSc
}
// const prisma = new PrismaClient();
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        console.log('~~~~~~~~~~~~ SIGNING IN WITH GOOGLE ~~~~~~~~~~~~')
        let profileEmail = profile?.email
        profileEmail =  'jfox@slusd.us'//xbugarin@slusd.us' // !! Override for testing
        const profileId = user?.id
        console.log({ profileEmail })
        console.log({ profileId })
        if (profileId && profileEmail) {
          const result = await syncTeacherClasses(profileId, profileEmail)
          console.log({ result })
        }

        console.log(user)

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
          UserSchool: {
            include: {
              school: true,
            },
          },
          school: true,
          UserClass: {
            include: {
              class: true,
            },
          },
        }, // Include roles if needed
      });

      let schools:string[] = []
      if (dbUser) {
        
        const dbUserSchools = dbUser.UserSchool.map((userSchool) => userSchool.school)
        const dbUserClasses = dbUser.UserClass.map((userClass) => userClass.class)
        
        
        schools = await getSchools(
          { schools: dbUserSchools, manualSchool: dbUser.manualSchool , classes: dbUserClasses },
        );
        

      }
      // console.log(dbUser)
      // @ts-ignore
      type SessionUser = {
        admin?: boolean;
        schools?: string[];
        roles?: ROLE[];
        classes?: Class[];
      } & User;

      session.user = {
        ...session.user,
        ...(dbUser as SessionUser),
        // @ts-ignore
        schools,
        roles: dbUser?.userRole.map((role) => role.role) || [],
        classes: dbUser?.UserClass.map((userClass) => userClass.class) || [],
      };
      // console.log(session)
      return session;
    },
  },
});


