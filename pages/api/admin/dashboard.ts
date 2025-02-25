import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get session and check for role
    const session = await getServerSession(req, res, authOptions);

    // If no session or user is not an Admin, deny access
    if (!session || session.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Access Denied" });
    }

    // Main response for authorized users
    res.status(200).json({
      message: "Welcome, Admin!",
      stats: {
        users: 150,           // Example data
        revenue: "$10,000",
        activeSessions: 25,
      },
    });
  } catch (error) {
    console.error("Error in Admin Dashboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
