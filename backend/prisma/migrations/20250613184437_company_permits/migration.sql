/*
  Warnings:

  - You are about to drop the column `issueDate` on the `Permit` table. All the data in the column will be lost.
  - You are about to drop the column `localContentPlan` on the `Permit` table. All the data in the column will be lost.
  - You are about to drop the column `permitNumber` on the `Permit` table. All the data in the column will be lost.
  - You are about to drop the column `projectDescription` on the `Permit` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `Permit` table. All the data in the column will be lost.
  - The `status` column on the `Permit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_PersonnelPermits` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referenceNumber]` on the table `Permit` will be added. If there are existing duplicate values, this will fail.
  - The required column `referenceNumber` was added to the `Permit` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "PermitStatus" AS ENUM ('DRAFT', 'SUBMITTED_TO_PC', 'PENDING_PC_APPROVAL', 'FORWARDED_TO_GIS', 'PENDING_GIS_APPROVAL', 'APPROVED_BY_GIS', 'REJECTED_BY_PC', 'REJECTED_BY_GIS', 'UNDER_REVIEW', 'REQUIRES_ADDITIONAL_INFO', 'APPROVED', 'REJECTED', 'ACTIVE', 'EXPIRED', 'CANCELLED');

-- AlterEnum
ALTER TYPE "PermitType" ADD VALUE 'WORK_PERMIT';

-- DropForeignKey
ALTER TABLE "Permit" DROP CONSTRAINT "Permit_companyId_fkey";

-- DropForeignKey
ALTER TABLE "_PersonnelPermits" DROP CONSTRAINT "_PersonnelPermits_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonnelPermits" DROP CONSTRAINT "_PersonnelPermits_B_fkey";

-- DropIndex
DROP INDEX "Permit_permitNumber_key";

-- AlterTable
ALTER TABLE "Permit" DROP COLUMN "issueDate",
DROP COLUMN "localContentPlan",
DROP COLUMN "permitNumber",
DROP COLUMN "projectDescription",
DROP COLUMN "projectName",
ADD COLUMN     "applicationDetails" JSONB,
ADD COLUMN     "approvalDate" TIMESTAMP(3),
ADD COLUMN     "personnelId" TEXT,
ADD COLUMN     "referenceNumber" TEXT NOT NULL,
ADD COLUMN     "reviewComments" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "PermitStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "companyId" DROP NOT NULL;

-- DropTable
DROP TABLE "_PersonnelPermits";

-- CreateIndex
CREATE UNIQUE INDEX "Permit_referenceNumber_key" ON "Permit"("referenceNumber");

-- AddForeignKey
ALTER TABLE "Permit" ADD CONSTRAINT "Permit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permit" ADD CONSTRAINT "Permit_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
