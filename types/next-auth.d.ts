// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // Extend DefaultSession's user
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
