// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `let` here to work with Next.js's hot reloading
  let prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
