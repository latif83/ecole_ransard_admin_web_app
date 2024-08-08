/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Assessments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assessments" DROP CONSTRAINT "Assessments_teacherId_fkey";

-- AlterTable
ALTER TABLE "Assessments" DROP COLUMN "teacherId",
ADD COLUMN     "teachersId" TEXT;

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_teachersId_fkey" FOREIGN KEY ("teachersId") REFERENCES "Teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
