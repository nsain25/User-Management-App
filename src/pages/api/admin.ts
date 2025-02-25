import { NextApiRequest, NextApiResponse } from "next";
import requireRole from "../../middleware/requireRole";

// Define handler as a named function
const adminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Admin route success!" });
};

// Export with a name to avoid anonymous function warning
const AdminApi = async (req: NextApiRequest, res: NextApiResponse) => {
  await requireRole(["ADMIN"])(req, res, () => adminHandler(req, res));
};

export default AdminApi;
