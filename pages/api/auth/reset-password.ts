import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { token, newPassword } = req.body;

  // Check if token and newPassword are provided
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  // Find the verification token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  // Check if the token is valid and not expired
  if (
    !verificationToken || 
    !verificationToken.expiresAt || // Check for null explicitly
    verificationToken.expiresAt < new Date()
  ) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  await prisma.user.update({
    where: { id: verificationToken.userId },
    data: { password: hashedPassword },
  });

  // Delete the token after use
  await prisma.verificationToken.delete({ where: { token } });

  return res.status(200).json({ message: "Password reset successfully" });
}
