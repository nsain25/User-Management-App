import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `var` here to work with Next.js's hot reloading
  var prisma: PrismaClient | undefined;
}

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = client;
}

export default client;
