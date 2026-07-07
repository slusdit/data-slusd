import { DefaultSession } from "next-auth";
import type { SessionUser } from "@/auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context. The session callback in auth.ts populates
   * the full SessionUser shape, so type it as such instead of a partial subset
   * (which forced `as unknown as SessionUser` casts everywhere).
   */
  interface Session {
    user: SessionUser & DefaultSession["user"];
  }
}
