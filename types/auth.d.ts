import { Role, SchoolInfo } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      admin?: boolean;
      schools?: string[];
      roles?: ROLE[];
      classes?: Class[];
      primaryRole: string;
      primarySchool?: number;
      activeSchool: number;
      psl: number;
      favorites: Query[];
      UserSchool: SchoolInfo[];
      userRole: Role[];
    } & DefaultSession["user"];
  }
}
