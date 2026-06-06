import { signInUser } from "@/src/features/users/user.actions";
import { User } from "@/src/features/users/user.schema";
import { dbConnect } from "@/src/lib/db";
import { generateUniqueSlug } from "@/src/lib/generateSlug";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
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

  callbacks: {
    async signIn({ user, profile, account }) {
      try {
        await dbConnect();

        if (account?.provider === "google" && profile) {
          if (!user.email) {
            return false;
          }

          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const uniqueSlug = await generateUniqueSlug(user?.name || undefined)
            const newUser = await User.create({
              email: user.email,
              username: profile.name || user.email.split("@")[0],
              avatarUrl: profile.image || user.image || undefined,
              handle: uniqueSlug,
            });
            
            user.id = newUser?._id?.toString();
          } else {
            await User.updateOne(
              { email: user.email },
              {
                avatarUrl: profile.image || user.image || undefined,
                username: profile.name || existingUser.username,
              },
            );
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
