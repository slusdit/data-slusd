import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, ROLE } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


const prisma = new PrismaClient()
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      if (account?.provider === "google") {
        return profile?.email_verified && profile?.email?.endsWith("@slusd.us")
      }

      return true
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [Google({


  })],

})


