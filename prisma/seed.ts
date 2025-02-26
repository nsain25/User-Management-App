// Import PrismaClient and bcrypt
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Create roles
    await prisma.role.upsert({
        where: { name: "ADMIN" },
        update: {},
        create: { name: "ADMIN" },
    });

    await prisma.role.upsert({
        where: { name: "USER" },
        update: {},
        create: { name: "USER" },
    });

    // Create a tenant
    const tenant = await prisma.tenant.upsert({
        where: { name: "DefaultTenant" },
        update: {},
        create: { name: "DefaultTenant" },
    });

    // Create an admin user with a hashed password
    const adminEmail = "admin@example.com";
    const adminPassword = "adminpassword";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: "Admin User",
            password: hashedPassword,
            emailVerified: true, // Ensure email is verified
            tenantId: tenant.id,
            roleId: (await prisma.role.findFirst({ where: { name: "ADMIN" } }))?.id,
        },
    });

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
