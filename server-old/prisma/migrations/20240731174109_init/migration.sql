/*
  Warnings:

  - Made the column `clinic_id` on table `branch` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "branch" DROP CONSTRAINT "branch_clinic_id_fkey";

-- AlterTable
ALTER TABLE "branch" ALTER COLUMN "clinic_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinic"("clinic_id") ON DELETE RESTRICT ON UPDATE CASCADE;
