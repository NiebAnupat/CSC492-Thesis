/*
  Warnings:

  - The primary key for the `branch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `branch_id` column on the `branch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `branch_id` on the `appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `branch_id` to the `audit_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_display_id` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_initial` to the `clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `clinic_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `dentist_workday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `expert_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `lab_vender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `medicine_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `operation_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `person_information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `branch_id` on the `receipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `branch_id` to the `requisition_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `tag_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `treatment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "audit_log" DROP CONSTRAINT "audit_log_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_stock" DROP CONSTRAINT "clinic_stock_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "dentist_workday" DROP CONSTRAINT "dentist_workday_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "expert_type" DROP CONSTRAINT "expert_type_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "lab_vender" DROP CONSTRAINT "lab_vender_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "medicine" DROP CONSTRAINT "medicine_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "medicine_type" DROP CONSTRAINT "medicine_type_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "operation_type" DROP CONSTRAINT "operation_type_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "person_information" DROP CONSTRAINT "person_information_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "receipt" DROP CONSTRAINT "receipt_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "requisition_product" DROP CONSTRAINT "requisition_product_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "tag_list" DROP CONSTRAINT "tag_list_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_branch_id_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "audit_log" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "branch" DROP CONSTRAINT "branch_pkey",
ADD COLUMN     "branch_display_id" VARCHAR NOT NULL,
DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" SERIAL NOT NULL,
ADD CONSTRAINT "branch_pkey" PRIMARY KEY ("branch_id");

-- AlterTable
ALTER TABLE "clinic" ADD COLUMN     "clinic_initial" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "clinic_stock" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "dentist_workday" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "expert_type" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lab_vender" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "medicine" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "medicine_type" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "operation_type" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "person_information" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "position" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "receipt" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "requisition_product" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tag_list" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "treatment" DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_stock" ADD CONSTRAINT "clinic_stock_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist_workday" ADD CONSTRAINT "dentist_workday_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_type" ADD CONSTRAINT "expert_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_vender" ADD CONSTRAINT "lab_vender_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_type" ADD CONSTRAINT "medicine_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_type" ADD CONSTRAINT "operation_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisition_product" ADD CONSTRAINT "requisition_product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_list" ADD CONSTRAINT "tag_list_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_information" ADD CONSTRAINT "person_information_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
