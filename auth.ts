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
        console.log('~~~~~~~~~~~~ SIGNING IN WITH GOOGLE ~~~~~~~~~~~~')
        const profileEmail = profile?.email 
        console.log({profileEmail})
        const result =  profile?.email_verified && /@slusd\.us$/.test(profileEmail as string) && !/\d/.test(profileEmail as string) 
        console.log({result})
        return result
        
        return profile?.email_verified && profile?.email?.endsWith("@slusd.us"  ) 
      }

      return true
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [Google({


  })],

})


