// src/middleware/requireRole.ts
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

// Define a type that covers both request types
type CustomRequest = NextRequest | NextApiRequest;

export function requireRole(allowedRoles: string[]) {
  return async (req: CustomRequest, res?: NextApiResponse) => {
    const token = await getToken({ req });

    // Check if the token exists
    if (!token) {
      if (res) {
        // Traditional API route redirection
        res.writeHead(302, { Location: "/auth/signin" });
        res.end();
        return;
      } else {
        // Middleware/Edge route redirection
        return NextResponse.redirect(new URL("/auth/signin", (req as NextRequest).url));
      }
    }

    // Extract role from the token with proper typing
    const userRole = (token as { role?: string }).role;

    // Check if the user role is allowed
    if (userRole && allowedRoles.includes(userRole)) {
      if (res) {
        // Continue API route execution
        return;
      } else {
        // Continue middleware execution
        return NextResponse.next();
      }
    } else {
      if (res) {
        // Traditional API route redirection
        res.writeHead(302, { Location: "/unauthorized" });
        res.end();
        return;
      } else {
        // Middleware/Edge route redirection
        return NextResponse.redirect(new URL("/unauthorized", (req as NextRequest).url));
      }
    }
  };
}
