import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import NextAuth, { getServerSession } from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          role: profile.role ?? ["USER"],
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    encryption: true,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60, // 24 hours
    algorithm: "HS512",
  },
  database: process.env.DATABASE_URL,
  callbacks: {
    async jwt({ token, user }:{token:any, user:any}) {
      if (user) {
        // Add user details to the token
        token.name = user.name;
        token.image = user.image;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, user }:{session:any, user:any}) {
      session.user.email = user.email;
      session.user.name = user.name;
      session.user.image = user.image;
      session.user.role = user.role;
      return session;
    },
  },
};


export function serverAuth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}