import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";
import { getAllSchools, getPrimarySchool, syncTeacherClasses } from "./lib/signinMiddleware";
import { Class, Query, ROLE, SchoolInfo, User } from "@prisma/client";
import { AeriesSimpleTeacher } from "./lib/aeries";
import { calculateCurrentSchoolYear } from "./lib/schoolYear";


export interface SessionUser extends User {
  schools?: string[];
  roles?: ROLE[];
  classes?: Class[];
  primaryRole: ROLE;
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
  roles: ROLE[],
  blockedRoles?: string | null,
  addedRoles?: string | null
): ROLE[] {
  let effectiveRoles = [...roles];

  // Add manually added roles
  if (addedRoles) {
    const addedList = addedRoles.split(',').map(s => s.trim()).filter(Boolean) as ROLE[];
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
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        // console.log('~~~~~~~~~~~~ SIGNING IN WITH GOOGLE ~~~~~~~~~~~~')
        let profileEmail = profile?.email
        // profileEmail =  'jfox@slusd.us' // 'xbugarin@slusd.us' // !! Override for testing
        const profileId = user?.id
        // console.log({ profileEmail })
        // console.log({ profileId })
        if (profileId && profileEmail) {
          const result = await syncTeacherClasses(profileId, profileEmail)
          // console.log({ user }, { account }, { profile }, { profileEmail }, { profileId }, { result })
          const allSchools = await getAllSchools(profileEmail)
          // console.log({ result })
        }

        // console.log(user)

        // console.log({ profileEmail })
        // console.log(profile?.email_verified && profile?.email?.endsWith("@slusd.us"))
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
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
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

      if (!dbUser) {
        return session;
      }

      // Check if user is emulating another user
      // Try to get emulatingId - column may not exist yet if migration hasn't run
      let emulatingId: string | null = null;
      try {
        const emulatingResult = await prisma.$queryRaw<Array<{ emulatingId: string | null }>>`
          SELECT emulatingId FROM User WHERE id = ${dbUser.id}
        `;
        emulatingId = emulatingResult[0]?.emulatingId || null;
      } catch (error) {
        // Column doesn't exist yet - emulation not available until migration runs
        emulatingId = null;
      }

      let effectiveUser = dbUser;
      let isEmulating = false;
      let emulatingUserInfo = null;
      let realUserInfo = null;

      if (emulatingId && dbUser.admin) {
        // Fetch the emulated user's data
        const emulatedUser = await prisma.user.findUnique({
          where: { id: emulatingId },
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

      // Get override fields - may not exist if migration hasn't run
      let blockedSchools: string | null = null;
      let addedSchools: string | null = null;
      let blockedRoles: string | null = null;
      let addedRoles: string | null = null;

      try {
        const overrideResult = await prisma.$queryRaw<Array<{
          blockedSchools: string | null;
          addedSchools: string | null;
          blockedRoles: string | null;
          addedRoles: string | null;
        }>>`
          SELECT blockedSchools, addedSchools, blockedRoles, addedRoles
          FROM User WHERE id = ${effectiveUser.id}
        `;
        if (overrideResult[0]) {
          blockedSchools = overrideResult[0].blockedSchools;
          addedSchools = overrideResult[0].addedSchools;
          blockedRoles = overrideResult[0].blockedRoles;
          addedRoles = overrideResult[0].addedRoles;
        }
      } catch (error) {
        // Columns don't exist yet - overrides not available until migration runs
      }

      const schools = await getSchools({
        schools: effectiveUserSchools,
        manualSchool: effectiveUser.manualSchool,
        classes: effectiveUserClasses,
        blockedSchools,
        addedSchools,
      });

      // Apply role overrides
      const baseRoles = effectiveUser.userRole.map((role) => role.role) || [];
      const roles = applyRoleOverrides(baseRoles, blockedRoles, addedRoles);

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


