/*
  Warnings:

  - You are about to drop the column `customer_provider` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "customer_provider",
ADD COLUMN     "provider" "customer_providers";
