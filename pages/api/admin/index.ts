import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Access Denied" });
  }

  res.status(200).json({ message: "Welcome Admin" });
}
