// pages/api/protected.ts
import { NextApiRequest, NextApiResponse } from "next";
import { checkRole } from "../../utils/authorization";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  // Check if the user has admin privileges
  const user = await checkRole(req, res, "ADMIN");
  if (!user) return;

  res.status(200).json({ message: "Success! You are authorized.", user });
}
