import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),  // ✅ Updated import
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            role: {
              select: {
                name: true, 
              },
            },
          },
        });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error("Incorrect password.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        });

        if (dbUser) {
          session.user = {
            id: dbUser.id,
            email: dbUser.email,
            role: dbUser.role ? dbUser.role.name : "No Role",
            name: dbUser.email.split("@")[0],
          };
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",  // ✅ Using JWT strategy
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
