import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get session and check for role
    const session = await getServerSession(req, res, authOptions);

    // If no session or user is not an Admin, deny access
    if (!session || session.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Access Denied" });
    }

    // Main response for authorized users
    res.status(200).json({ message: "Protected Admin Route" });
  } catch (error) {
    console.error("Error in Protected Admin Route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
