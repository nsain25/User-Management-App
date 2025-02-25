import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Token is required" });
  }

  // Find verification token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid token" });
  }

  // Fetch the user
  const user = await prisma.user.findUnique({
    where: { id: verificationToken.userId },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Mark user as verified
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true },
  });

  // Delete the verification token after use
  await prisma.verificationToken.delete({ where: { token } });

  // Generate JWT token
  const jwtToken = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ message: "Email verified successfully", token: jwtToken });
}
