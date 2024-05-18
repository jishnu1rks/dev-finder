import { db } from "@/app/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { AuthOptions, DefaultSession, User } from "next-auth";
import Google from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email),
      });

      if (!dbUser) {
        throw new Error("User not found");
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.image as string,
        };
      }

      return session;
    },
  },
} satisfies AuthOptions;

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
