/*
  Warnings:

  - You are about to drop the column `discoutPercentage` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discoutPercentage",
ADD COLUMN     "discountPercentage" INTEGER NOT NULL DEFAULT 0;
