/*
  Warnings:

  - Added the required column `academicTermId` to the `Grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grades" ADD COLUMN     "academicTermId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_academicTermId_fkey" FOREIGN KEY ("academicTermId") REFERENCES "AcademicTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
