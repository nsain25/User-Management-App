// src/pages/api/admin.ts
import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "../../middleware/requireRole";

// Define handler as a named function
const adminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Admin route success!" });
};

// Export with a name to avoid anonymous function warning
const AdminApi = async (req: NextApiRequest, res: NextApiResponse) => {
  // Call requireRole and pass both req and res
  await requireRole(["ADMIN"])(req, res);

  // If role check passes, proceed to the handler
  await adminHandler(req, res);
};

export default AdminApi;
