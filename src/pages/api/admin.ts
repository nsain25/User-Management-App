import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "../../middleware/requireRole";

// Define handler as a named function
const adminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Admin route success!" });
};

// Export with a name to avoid anonymous function warning
const AdminApi = async (req: NextApiRequest, res: NextApiResponse) => {
  // Call requireRole and wait for the response
  const roleCheck = await requireRole(["ADMIN"])(req);

  // If the role check returns a redirect, end the response
  if (roleCheck instanceof Response) {
    res.status(roleCheck.status).end();
    return;
  }

  // If role check passes, proceed to the handler
  await adminHandler(req, res);
};

export default AdminApi;
