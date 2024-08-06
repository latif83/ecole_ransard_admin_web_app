/*
  Warnings:

  - You are about to drop the column `amountOwed` on the `StudentFeeDetail` table. All the data in the column will be lost.
  - You are about to drop the column `amountPaid` on the `StudentFeeDetail` table. All the data in the column will be lost.
  - Added the required column `amount` to the `StudentFeeDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentFeeDetail" DROP COLUMN "amountOwed",
DROP COLUMN "amountPaid",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
