import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Import bcrypt

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Hash the password
  const hashedPassword = await bcrypt.hash("testpassword", 10); // Replace with any test password

  // Create a test user
  await prisma.user.create({
    data: {
      email: "test@example.com",
      password: hashedPassword, // Store the hashed password
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

