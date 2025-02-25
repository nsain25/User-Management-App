-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "expiresAt" DROP NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT '2099-12-31 23:59:59'::timestamp;
