-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" TEXT;

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "expiresAt" SET DEFAULT '2099-12-31 23:59:59'::timestamp;

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
