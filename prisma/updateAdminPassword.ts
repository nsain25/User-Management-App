import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function updateAdminPassword() {
    const newPassword = 'YourNewAdminPass123'; // Change this to your desired password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
        where: { email: 'admin@example.com' },
        data: { password: hashedPassword },
    });

    console.log('Admin password updated successfully:', updatedUser);
}

updateAdminPassword()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
