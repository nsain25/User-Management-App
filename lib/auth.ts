import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/authOptions";

type NextFunction = () => void;

export function requireRole(allowedRoles: string[]) {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session || !session.user?.role || !allowedRoles.includes(session.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
