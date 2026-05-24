import { signInUser } from "@/src/features/users/user.actions";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        return await signInUser({
          email: credentials.email,
          password: credentials.password,
        });
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
