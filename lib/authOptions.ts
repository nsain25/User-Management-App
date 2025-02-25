import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
                name: true, // ✅ Include role name
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
    async session({ session }) { // ✅ Removed unused token and user
      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
        include: {
          role: {
            select: {
              name: true, // ✅ Include role name
            },
          },
        },
      });

      if (dbUser) {
        session.user = {
          id: dbUser.id,
          email: dbUser.email,
          role: dbUser.role ? dbUser.role.name : "No Role", // ✅ Safely accessing role name
          name: dbUser.email.split("@")[0], // Default name from email
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
