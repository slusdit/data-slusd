import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";
import { getAllSchools, getPrimarySchool, syncTeacherClasses } from "./lib/signinMiddleware";
import { Class, ROLE, SchoolInfo, User } from "@prisma/client";
import { AeriesSimpleTeacher } from "./lib/aeries";

export interface SessionUser extends User {
  schools?: string[];
  roles?: ROLE[];
  classes?: Class[];
  primaryRole: ROLE;
  favorites: Query[];
  primarySchool: number | null;
  activeSchool: number;
  psl: number;
}

async function getSchools({
  schools,
  manualSchool,
  classes,
}: {
  schools: SchoolInfo[]
  manualSchool?: number | null
  classes?: Class[] | null
}) {
  let schoolsSc: string[] = schools.length > 0 ? schools.map((school) => school.sc) : []

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
        let profileEmail = profile?.email
        const profileId = user?.id
        if (profileId && profileEmail) {
          const result = await syncTeacherClasses(profileId, profileEmail)
          const allSchools = await getAllSchools(profileEmail)
        }

        return profile?.email_verified && profile?.email?.endsWith("@slusd.us")
      }

      return true;
    },
    
    async session({ session, user }:
      {
        session: SessionUser
        user: any
      }
    ) {
      // Emulation override - Remove this in production or add proper controls
      const emulatedUserId = null // 'cm73n2pf60004hz1rsv056ri8';
      const emulatedUserEmail = null //'jalmendarez@slusd.us';
      
      // Use the emulated user's ID for database queries
      const userId = emulatedUserId || user?.id;

      const dbUser = await prisma.user.findUnique({
        where: { id: userId }, // Using emulated user ID
        include: {
          favorites: {
            include: {
              category: true
            }
          },
          userRole: {
            include: {
              QueryCategory: true,
            },
          },
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
        },
      });

      let schools: string[] = []
      if (dbUser) {
        const dbUserSchools = dbUser.UserSchool.map((userSchool) => userSchool.school)
        const dbUserClasses = dbUser.UserClass.map((userClass) => userClass.class)

        schools = await getSchools(
          { schools: dbUserSchools, manualSchool: dbUser.manualSchool, classes: dbUserClasses },
        );
      }

      // Override the session user with emulated user data
      session.user = {
        ...session.user,
        ...(dbUser as SessionUser),
        email: emulatedUserEmail, // Override email with emulated user's email
        primaryRole: dbUser?.primaryRole,
        primarySchool: dbUser?.primarySchool,
        activeSchool: dbUser?.activeSchool,
        psl: dbUser?.psl,
        favorites: dbUser?.favorites || [],
        roles: dbUser?.userRole.map((role) => role.role) || [],
        classes: dbUser?.UserClass.map((userClass) => userClass.class) || [],
      };

      return session;
    },
  },
});