const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash("testpassword", 10);
    const user = await prisma.user.create({
      data: { email: "test@example.com", password: hashedPassword },
    });

    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
