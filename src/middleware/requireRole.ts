// src/middleware/requireRole.ts
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export function requireRole(allowedRoles: string[]) {
  return async (
    req: NextRequest | (NextApiRequest & { cookies: { [key: string]: string } }),
    res?: NextApiResponse
  ) => {
    // Determine if it's a NextRequest (middleware) or NextApiRequest (API route)
    const isMiddleware = req instanceof NextRequest;

    // Get token using getToken from next-auth/jwt
    const token = await getToken({ req: isMiddleware ? (req as NextRequest) : (req as NextApiRequest) });

    // If no token, redirect to sign-in page
    if (!token) {
      if (isMiddleware) {
        return NextResponse.redirect(new URL("/auth/signin", (req as NextRequest).url));
      } else {
        res?.writeHead(302, { Location: "/auth/signin" });
        res?.end();
        return;
      }
    }

    // Extract role from token with proper typing
    const userRole = (token as { role?: string }).role;

    // Check if user role is allowed
    if (userRole && allowedRoles.includes(userRole)) {
      if (isMiddleware) {
        return NextResponse.next();
      } else {
        return; // Continue with API route execution
      }
    } else {
      // If role is not allowed, redirect to unauthorized page
      if (isMiddleware) {
        return NextResponse.redirect(new URL("/unauthorized", (req as NextRequest).url));
      } else {
        res?.writeHead(302, { Location: "/unauthorized" });
        res?.end();
        return;
      }
    }
  };
}
