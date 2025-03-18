import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // Right now only store owner can create account (hardcoded to be my email)
  callbacks: {
    async signIn({ user }: { user: User }) {
      console.log(user)
      const allowedEmail = await prisma.storeOwner.findUnique({
        where: { email: user.email! },
      });

      if (!allowedEmail) {
        return false; 
      }
      return true;
    },
    async session({ session }: { session: Session }) {
      return session;
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
