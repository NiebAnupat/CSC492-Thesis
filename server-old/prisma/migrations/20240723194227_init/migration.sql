/*
  Warnings:

  - You are about to drop the column `branch_id` on the `person_information` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "person_information" DROP CONSTRAINT "person_information_branch_id_fkey";

-- AlterTable
ALTER TABLE "dentist" ADD COLUMN     "branch_id" INTEGER;

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "branch_id" INTEGER;

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "branch_id" INTEGER;

-- AlterTable
ALTER TABLE "person_information" DROP COLUMN "branch_id";

-- AddForeignKey
ALTER TABLE "dentist" ADD CONSTRAINT "dentist_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
