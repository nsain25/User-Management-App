// utils/authorization.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define a function to check user roles
export async function checkRole(req: NextApiRequest, res: NextApiResponse, requiredRole: string) {
  const session = await getSession({ req });

  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Fetch user from database with roles
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { role: true }, // Ensure Role relation is included
  });

  if (!user || !user.role || user.role.name !== requiredRole) {
  return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
}

  return user; // Return user details if authorization passes
}
