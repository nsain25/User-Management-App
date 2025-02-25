// src/middleware/requireRole.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export function requireRole(allowedRoles: string[]) {
  return async (req: NextRequest) => {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const userRole = token.role;

    if (userRole && allowedRoles.includes(userRole)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  };
}
