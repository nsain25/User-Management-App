// types/express.d.ts
import { User } from "@prisma/client";  // Adjust if you're not using Prisma

declare global {
  namespace Express {
    interface Request {
      user?: User; // Make sure User is the correct type
    }
  }
}
