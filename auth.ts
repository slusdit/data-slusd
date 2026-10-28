import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { cache } from "react";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";
import { getAllSchools, syncTeacherClasses } from "./lib/signinSync";
import { Class, Query, SchoolInfo, User } from "@prisma/client";
import { AeriesSimpleTeacher, getAeriesStaff } from "./lib/aeries";
import { calculateCurrentSchoolYear } from "./lib/schoolYear";


export interface SessionUser extends User {
  schools?: string[];
  roles?: string[];
  classes?: Class[];
  primaryRole: string;
  favorites: Query[];
  primarySchool: number | null;
  activeSchool: number;
  activeDbYear: number;
  psl: number;
  UserSchool: Array<{
    school: {
      sc: string;
      name: string;
      logo?: string;
    };
  }>;
  // Emulation fields
  isEmulating?: boolean;
  emulatingUser?: {
    id: string;
    name: string;
    email: string;
  };
  realUser?: {
    id: string;
    name: string;
    email: string;
    admin: boolean;
  };
}

async function getSchools({
  schools,
  manualSchool,
  classes,
  blockedSchools,
  addedSchools,
}: {
  schools: SchoolInfo[]
  manualSchool?: number | null
  classes?: Class[] | null
  blockedSchools?: string | null
  addedSchools?: string | null
}) {

  let schoolsSc: string[] = schools.length > 0 ? schools.map((school) => school.sc) : []

  if (manualSchool) {
    schoolsSc = Array.from(new Set([...schoolsSc, manualSchool.toString()]))
  }

  if (classes) {
    const assignedClassesSc = classes.map((classObj) => classObj.sc.toString())
    schoolsSc = Array.from(new Set([...schoolsSc, ...assignedClassesSc]))
  }

  // Apply manual overrides
  // Add manually added schools
  if (addedSchools) {
    const addedList = addedSchools.split(',').map(s => s.trim()).filter(Boolean);
    schoolsSc = Array.from(new Set([...schoolsSc, ...addedList]));
  }

  // Remove blocked schools (overrides everything)
  if (blockedSchools) {
    const blockedList = blockedSchools.split(',').map(s => s.trim()).filter(Boolean);
    schoolsSc = schoolsSc.filter(sc => !blockedList.includes(sc));
  }

  return schoolsSc
}

// Apply role overrides (add and block)
function applyRoleOverrides(
  roles: string[],
  blockedRoles?: string | null,
  addedRoles?: string | null
): string[] {
  let effectiveRoles = [...roles];

  // Add manually added roles
  if (addedRoles) {
    const addedList = addedRoles.split(',').map(s => s.trim()).filter(Boolean);
    effectiveRoles = Array.from(new Set([...effectiveRoles, ...addedList]));
  }

  // Remove blocked roles (overrides everything)
  if (blockedRoles) {
    const blockedList = blockedRoles.split(',').map(s => s.trim()).filter(Boolean);
    effectiveRoles = effectiveRoles.filter(role => !blockedList.includes(role));
  }

  return effectiveRoles;
}

// const prisma = new PrismaClient();
const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  trustHost: true,
  events: {
    // Sync runs after PrismaAdapter has created the user record, so DB operations
    // work on first sign-in (unlike the signIn callback which fires before creation).
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const profileEmail = profile?.email
        const profileId = user?.id
        if (profileId && profileEmail) {
          try {
            // One Aeries staff lookup shared by both syncs (finding P7); they write
            // to different tables (classes/roles vs schools) so they run in parallel.
            const aeriesStaff = await getAeriesStaff({ email: profileEmail }).catch((err) => {
              console.error("Aeries staff lookup failed at sign-in:", err)
              return null
            })
            await Promise.all([
              syncTeacherClasses(profileId, profileEmail, aeriesStaff),
              getAllSchools(profileEmail, aeriesStaff),
            ])

            // Update lastLogin timestamp
            await prisma.user.update({
              where: { id: profileId },
              data: { lastLogin: new Date() }
            })
          } catch (error) {
            console.error("Sign-in sync error:", error)
          }
        }
      }
    },
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return !!(profile?.email_verified && profile?.email?.endsWith("@slusd.us"))
      }

      return true;
    },
    
    async session({ session, user }: { session: any; user: any }) {
      // Define shared include structure to avoid duplication
      const userInclude = {
        favorites: {
          include: {
            category: true
          }
        },
        UserRole: {
          include: {
            role: true,
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
      };

      // Fetch user with emulatingId in a single query
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          ...userInclude,
          id: true,
          name: true,
          email: true,
          image: true,
          admin: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true,
          queryEdit: true,
          primaryRole: true,
          emailVerified: true,
          primarySchool: true,
          psl: true,
          activeSchool: true,
          activeDbYear: true,
          manualSchool: true,
          emulatingId: true, // Include emulatingId directly
          blockedSchools: true,
          addedSchools: true,
          blockedRoles: true,
          addedRoles: true,
        },
      });

      if (!dbUser) {
        return session;
      }

      let effectiveUser = dbUser;
      let isEmulating = false;
      let emulatingUserInfo = null;
      let realUserInfo = null;

      // Check if user is emulating (emulatingId is now already loaded)
      if (dbUser.emulatingId && dbUser.admin) {
        // Fetch the emulated user's data
        const emulatedUser = await prisma.user.findUnique({
          where: { id: dbUser.emulatingId },
          select: {
            ...userInclude,
            id: true,
            name: true,
            email: true,
            image: true,
            admin: true,
            createdAt: true,
            updatedAt: true,
            lastLogin: true,
            queryEdit: true,
            primaryRole: true,
            emailVerified: true,
            primarySchool: true,
            psl: true,
            activeSchool: true,
            activeDbYear: true,
            manualSchool: true,
            emulatingId: true,
            blockedSchools: true,
            addedSchools: true,
            blockedRoles: true,
            addedRoles: true,
          },
        });

        if (emulatedUser) {
          effectiveUser = emulatedUser;
          isEmulating = true;
          emulatingUserInfo = {
            id: emulatedUser.id,
            name: emulatedUser.name,
            email: emulatedUser.email,
          };
          realUserInfo = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            admin: dbUser.admin,
          };
        }
      }

      const effectiveUserSchools = effectiveUser.UserSchool.map((userSchool) => userSchool.school);
      const effectiveUserClasses = effectiveUser.UserClass.map((userClass) => userClass.class);

      // Override fields are now loaded directly in the query above
      const schools = await getSchools({
        schools: effectiveUserSchools,
        manualSchool: effectiveUser.manualSchool,
        classes: effectiveUserClasses,
        blockedSchools: effectiveUser.blockedSchools,
        addedSchools: effectiveUser.addedSchools,
      });

      // Apply role overrides — read from explicit UserRole table (where Aeries sync writes)
      const baseRoles: string[] = effectiveUser.UserRole.map((ur) => ur.role.role) || [];
      // Include primaryRole in the roles array so it's used for access control
      if (effectiveUser.primaryRole && !baseRoles.includes(effectiveUser.primaryRole)) {
        baseRoles.push(effectiveUser.primaryRole);
      }
      const roles = applyRoleOverrides(baseRoles, effectiveUser.blockedRoles, effectiveUser.addedRoles);

      session.user = {
        ...session.user,
        ...(effectiveUser as SessionUser),
        schools,
        primaryRole: effectiveUser.primaryRole,
        primarySchool: effectiveUser.primarySchool,
        activeSchool: effectiveUser.activeSchool,
        activeDbYear: (effectiveUser as any).activeDbYear ?? calculateCurrentSchoolYear(), // Default to calculated current school year
        psl: effectiveUser.psl,
        favorites: effectiveUser.favorites || [],
        roles,
        classes: effectiveUser.UserClass.map((userClass) => userClass.class) || [],
        // Emulation info
        isEmulating,
        emulatingUser: emulatingUserInfo,
        realUser: realUserInfo,
        // Use emulated user's admin status so emulation shows exactly what that user would see
        admin: effectiveUser.admin,
      };
      return session;
    },
  },
});

export const { handlers, signIn, signOut } = nextAuth;

// Request-memoized session (finding P3): the layout, page, header and every
// requireUser() in one render share a single session lookup instead of each
// re-running the five-include Prisma query. React's cache() is scoped to one
// server request; outside a React render (route handlers) it calls through.
export const auth: typeof nextAuth.auth = cache(nextAuth.auth);
