/*
  Warnings:

  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employee_id` on the `receipt` table. All the data in the column will be lost.
  - Added the required column `employee_uid` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_uid` to the `receipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "audit_log" DROP CONSTRAINT "audit_log_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "branch" DROP CONSTRAINT "branch_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "clinic_stock" DROP CONSTRAINT "clinic_stock_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "dentist_workday" DROP CONSTRAINT "dentist_workday_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "expert_type" DROP CONSTRAINT "expert_type_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "lab_request" DROP CONSTRAINT "lab_request_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "lab_vender" DROP CONSTRAINT "lab_vender_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "medicine" DROP CONSTRAINT "medicine_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "medicine_type" DROP CONSTRAINT "medicine_type_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "operation_type" DROP CONSTRAINT "operation_type_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "person_information" DROP CONSTRAINT "person_information_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "receipt" DROP CONSTRAINT "receipt_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "receipt" DROP CONSTRAINT "receipt_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "receipt_payment" DROP CONSTRAINT "receipt_payment_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "receipt_product" DROP CONSTRAINT "receipt_product_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "requisition_product" DROP CONSTRAINT "requisition_product_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "tag_list" DROP CONSTRAINT "tag_list_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "treatment_document" DROP CONSTRAINT "treatment_document_edit_by_fkey";

-- DropForeignKey
ALTER TABLE "treatment_nv" DROP CONSTRAINT "treatment_nv_edit_by_fkey";

-- AlterTable
ALTER TABLE "employee" DROP CONSTRAINT "employee_pkey",
ADD COLUMN     "employee_uid" VARCHAR NOT NULL,
ADD CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_uid");

-- AlterTable
ALTER TABLE "receipt" DROP COLUMN "employee_id",
ADD COLUMN     "employee_uid" VARCHAR NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_stock" ADD CONSTRAINT "clinic_stock_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist_workday" ADD CONSTRAINT "dentist_workday_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_type" ADD CONSTRAINT "expert_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_request" ADD CONSTRAINT "lab_request_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_vender" ADD CONSTRAINT "lab_vender_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_type" ADD CONSTRAINT "medicine_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_type" ADD CONSTRAINT "operation_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_employee_uid_fkey" FOREIGN KEY ("employee_uid") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_payment" ADD CONSTRAINT "receipt_payment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_product" ADD CONSTRAINT "receipt_product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisition_product" ADD CONSTRAINT "requisition_product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_list" ADD CONSTRAINT "tag_list_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_document" ADD CONSTRAINT "treatment_document_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_nv" ADD CONSTRAINT "treatment_nv_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_information" ADD CONSTRAINT "person_information_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
