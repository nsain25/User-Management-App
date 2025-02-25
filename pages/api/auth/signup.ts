import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, password, roleId } = req.body;

    if (!email || !password || !roleId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return res
      .status(201)
      .json({ message: "User registered", userId: user.id });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Error creating user" });
  } finally {
    await prisma.$disconnect();
  }
}
