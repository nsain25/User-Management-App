import prisma from "@/lib/prisma"; // Use the singleton instance
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: { // Made user optional here
      id: string;
      email: string;
      role: string;
    };
  }
  interface User {
    id: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
          include: { role: true },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        const isValidPassword = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        console.log("User authenticated successfully");
        return {
          id: user.id,
          email: user.email,
          role: user.role.name, // Access role name here
          name: user.email.split("@")[0], // Use the part before '@' as name
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Ensure session.user is defined before accessing its properties
        session.user = session.user ?? {};
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};
