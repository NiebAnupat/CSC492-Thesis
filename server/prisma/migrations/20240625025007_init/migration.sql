-- CreateEnum
CREATE TYPE "actions" AS ENUM ('create', 'update', 'insert', 'delete');

-- CreateEnum
CREATE TYPE "appointment_status" AS ENUM ('pending', 'cancel', 'success');

-- CreateEnum
CREATE TYPE "days" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- CreateEnum
CREATE TYPE "genders" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "packages" AS ENUM ('free', 'basic', 'premium', 'vip');

-- CreateEnum
CREATE TYPE "payment_types" AS ENUM ('cash', 'credit_card', 'bank_transfer', 'sso');

-- CreateEnum
CREATE TYPE "product_types" AS ENUM ('consume', 'sale');

-- CreateEnum
CREATE TYPE "stock_types" AS ENUM ('product', 'medicine');

-- CreateEnum
CREATE TYPE "treatment_record_fields" AS ENUM ('subject', 'objective', 'assessment', 'plan');

-- CreateEnum
CREATE TYPE "customer_providers" AS ENUM ('local', 'google');

-- CreateTable
CREATE TABLE "appointment" (
    "appointment_id" VARCHAR NOT NULL,
    "hn" VARCHAR,
    "dentist_id" VARCHAR,
    "appointment_date" DATE,
    "appointment_time" TIME(6),
    "is_nv_refer" BOOLEAN DEFAULT false,
    "nv_operation_id" INTEGER,
    "quantity" INTEGER DEFAULT 1,
    "is_notify" BOOLEAN DEFAULT false,
    "status" "appointment_status" DEFAULT 'pending',
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("appointment_id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "audit_log_id" SERIAL NOT NULL,
    "action" "actions",
    "table_name" VARCHAR,
    "row_id" VARCHAR,
    "old_value" JSON,
    "new_value" JSON,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("audit_log_id")
);

-- CreateTable
CREATE TABLE "branch" (
    "branch_id" VARCHAR NOT NULL,
    "branch_name" VARCHAR NOT NULL,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "provice_id" INTEGER,
    "telephone" CHAR(10) NOT NULL,
    "image_url" VARCHAR,
    "manager_id" VARCHAR NOT NULL,
    "owner_account" VARCHAR NOT NULL,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "clinic_stock" (
    "clinic_stock_id" VARCHAR NOT NULL,
    "stock_type" "stock_types" NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "unit_price" DECIMAL NOT NULL DEFAULT 0,
    "minimun_quantity" INTEGER NOT NULL DEFAULT 1,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "clinic_stock_pkey" PRIMARY KEY ("clinic_stock_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "customer_id" VARCHAR NOT NULL,
    "customer_provider" "customer_providers",
    "email" VARCHAR,
    "password" VARCHAR,
    "person_information_id" INTEGER NOT NULL,
    "package" "packages" NOT NULL DEFAULT 'free',

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "dentist" (
    "dentist_id" VARCHAR NOT NULL,
    "password" VARCHAR,
    "dentist_certificate_number" VARCHAR,
    "expert_type_id" INTEGER,
    "dentist_fee_rate" DECIMAL NOT NULL DEFAULT 0.5,
    "default_lab_rate" DECIMAL NOT NULL DEFAULT 0.5,
    "person_information_id" INTEGER,

    CONSTRAINT "dentist_pkey" PRIMARY KEY ("dentist_id")
);

-- CreateTable
CREATE TABLE "dentist_workday" (
    "dentist_workday_id" SERIAL NOT NULL,
    "dentist_id" VARCHAR,
    "day" "days",
    "time_start" TIME(6),
    "time_end" TIME(6),
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "dentist_workday_pkey" PRIMARY KEY ("dentist_workday_id")
);

-- CreateTable
CREATE TABLE "dispensing_medicine" (
    "dispensing_id" SERIAL NOT NULL,
    "treatment_id" VARCHAR,
    "clinic_stock_id" VARCHAR,
    "quantity" INTEGER,

    CONSTRAINT "dispensing_medicine_pkey" PRIMARY KEY ("dispensing_id")
);

-- CreateTable
CREATE TABLE "employee" (
    "employee_id" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "position_id" INTEGER,
    "person_information_id" INTEGER NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "expert_type" (
    "expert_type_id" SERIAL NOT NULL,
    "expert_type_name" VARCHAR,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "expert_type_pkey" PRIMARY KEY ("expert_type_id")
);

-- CreateTable
CREATE TABLE "lab_request" (
    "lab_request_id" SERIAL NOT NULL,
    "treatment_id" VARCHAR,
    "vender_id" INTEGER,
    "lab_title" VARCHAR,
    "lab_description" TEXT,
    "request_date" DATE,
    "receive_date" DATE,
    "cost" DECIMAL,
    "override_dentist_lab_rate" DECIMAL,
    "is_receive" BOOLEAN DEFAULT false,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,

    CONSTRAINT "lab_request_pkey" PRIMARY KEY ("lab_request_id")
);

-- CreateTable
CREATE TABLE "lab_vender" (
    "vender_id" SERIAL NOT NULL,
    "vender_name" VARCHAR,
    "vender_description" TEXT,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "provice_id" INTEGER,
    "telephone" CHAR(10),
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "lab_vender_pkey" PRIMARY KEY ("vender_id")
);

-- CreateTable
CREATE TABLE "medicine" (
    "medicine_id" SERIAL NOT NULL,
    "medicine_name" VARCHAR,
    "medicine_type_id" INTEGER,
    "instruction" TEXT,
    "precaution" TEXT,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "medicine_pkey" PRIMARY KEY ("medicine_id")
);

-- CreateTable
CREATE TABLE "medicine_type" (
    "medicine_type_id" SERIAL NOT NULL,
    "medicine_type_name" VARCHAR,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "medicine_type_pkey" PRIMARY KEY ("medicine_type_id")
);

-- CreateTable
CREATE TABLE "operation_type" (
    "operation_type_id" SERIAL NOT NULL,
    "operation_type_name" VARCHAR,
    "default_time_spend" DECIMAL DEFAULT 15,
    "default_unit_price" DECIMAL DEFAULT 0,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "operation_type_pkey" PRIMARY KEY ("operation_type_id")
);

-- CreateTable
CREATE TABLE "patient" (
    "hn" VARCHAR NOT NULL,
    "person_information_id" INTEGER,
    "current_medication" TEXT,
    "drug_allergy" TEXT,
    "congenital_disease" TEXT,
    "is_pregnant" BOOLEAN NOT NULL DEFAULT false,
    "contact_person_name" VARCHAR,
    "contact_person_relation" VARCHAR,
    "contact_person_telephone" CHAR(10),

    CONSTRAINT "patient_pkey" PRIMARY KEY ("hn")
);

-- CreateTable
CREATE TABLE "patient_tag" (
    "patient_tag_record_id" SERIAL NOT NULL,
    "tag_id" INTEGER,
    "hn" VARCHAR,

    CONSTRAINT "patient_tag_pkey" PRIMARY KEY ("patient_tag_record_id")
);

-- CreateTable
CREATE TABLE "position" (
    "position_id" SERIAL NOT NULL,
    "position_name" VARCHAR,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "branch_id" VARCHAR,

    CONSTRAINT "position_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" SERIAL NOT NULL,
    "product_name" VARCHAR,
    "product_type" "product_types",
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "provice" (
    "provice_id" SERIAL NOT NULL,
    "province_name_th" VARCHAR NOT NULL,
    "province_name_en" VARCHAR NOT NULL,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "provice_pkey" PRIMARY KEY ("provice_id")
);

-- CreateTable
CREATE TABLE "receipt" (
    "receipt_id" VARCHAR NOT NULL,
    "treatment_id" VARCHAR,
    "override_dentist_fee_rate" DECIMAL,
    "total_price" DECIMAL DEFAULT 0,
    "discount" DECIMAL DEFAULT 0,
    "arrearage" DECIMAL DEFAULT 0,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_cancel" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" VARCHAR NOT NULL,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR NOT NULL,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("receipt_id")
);

-- CreateTable
CREATE TABLE "receipt_payment" (
    "receipt_payment_id" SERIAL NOT NULL,
    "receipt_id" VARCHAR,
    "payment_amount" DECIMAL,
    "payment_type" "payment_types",
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "edit_by" VARCHAR,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "receipt_payment_pkey" PRIMARY KEY ("receipt_payment_id")
);

-- CreateTable
CREATE TABLE "receipt_product" (
    "receipt_product_id" SERIAL NOT NULL,
    "receipt_id" VARCHAR,
    "clinic_stock_id" VARCHAR,
    "quantity" INTEGER,
    "override_unit_price" DECIMAL,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "edit_by" VARCHAR,

    CONSTRAINT "receipt_product_pkey" PRIMARY KEY ("receipt_product_id")
);

-- CreateTable
CREATE TABLE "requisition_product" (
    "requisition_id" VARCHAR NOT NULL,
    "clinic_stock_id" VARCHAR,
    "quantity" INTEGER,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "requisition_product_pkey" PRIMARY KEY ("requisition_id")
);

-- CreateTable
CREATE TABLE "tag_list" (
    "tag_id" SERIAL NOT NULL,
    "tag_name" VARCHAR,
    "tag_color" VARCHAR,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "tag_list_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "treatment" (
    "treatment_id" VARCHAR NOT NULL,
    "hn" VARCHAR,
    "dentist_id" VARCHAR,
    "subject" TEXT,
    "objective" TEXT,
    "assessment" TEXT,
    "plan" TEXT,
    "recall_date" DATE,
    "is_noitfy_recall" BOOLEAN DEFAULT false,
    "note_to_counter_staff" TEXT,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "branch_id" VARCHAR,

    CONSTRAINT "treatment_pkey" PRIMARY KEY ("treatment_id")
);

-- CreateTable
CREATE TABLE "treatment_document" (
    "document_id" SERIAL NOT NULL,
    "treatment_id" VARCHAR,
    "document_name" VARCHAR,
    "document_url" VARCHAR,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,

    CONSTRAINT "treatment_document_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "treatment_nv" (
    "treatment_nv_id" SERIAL NOT NULL,
    "treatment_id" VARCHAR,
    "nv_detail" TEXT,
    "date_notify" DATE,
    "is_notify" BOOLEAN,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "edit_by" VARCHAR,

    CONSTRAINT "treatment_nv_pkey" PRIMARY KEY ("treatment_nv_id")
);

-- CreateTable
CREATE TABLE "treatment_nv_operation" (
    "nv_operation_id" SERIAL NOT NULL,
    "treatment_nv_id" INTEGER,
    "operation_type_id" INTEGER,
    "tooth_position" VARCHAR,
    "refer_denstist_expert_type_id" INTEGER,
    "is_appointment" BOOLEAN DEFAULT false,

    CONSTRAINT "treatment_nv_operation_pkey" PRIMARY KEY ("nv_operation_id")
);

-- CreateTable
CREATE TABLE "treatment_operation" (
    "treatment_operation_id" SERIAL NOT NULL,
    "treatment_id" VARCHAR,
    "operation_type_id" INTEGER,
    "quantity" INTEGER DEFAULT 1,
    "tooth_position" VARCHAR,
    "override_unit_price" DECIMAL,

    CONSTRAINT "treatment_operation_pkey" PRIMARY KEY ("treatment_operation_id")
);

-- CreateTable
CREATE TABLE "treatment_record_edit_history" (
    "record_edit_history_id" SERIAL NOT NULL,
    "treatment_id" VARCHAR,
    "edit_at" TIMESTAMP(6),
    "edit_by" VARCHAR,
    "edit_field" "treatment_record_fields",
    "old_value" TEXT,
    "new_value" TEXT,

    CONSTRAINT "treatment_record_edit_history_pkey" PRIMARY KEY ("record_edit_history_id")
);

-- CreateTable
CREATE TABLE "treatment_record_template" (
    "record_template_id" SERIAL NOT NULL,
    "field" "treatment_record_fields",
    "value" TEXT,
    "create_at" TIMESTAMP(6),
    "create_by" VARCHAR,

    CONSTRAINT "treatment_record_template_pkey" PRIMARY KEY ("record_template_id")
);

-- CreateTable
CREATE TABLE "person_information" (
    "person_information_id" SERIAL NOT NULL,
    "nationality" VARCHAR,
    "citizen_id" CHAR(13),
    "gender" "genders",
    "prefix" VARCHAR,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "telephone" CHAR(10),
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "provice_id" INTEGER,
    "hire_date" DATE,
    "birth_date" DATE,
    "avatar" VARCHAR,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edit_by" VARCHAR,
    "deleted_at" TIMESTAMP(6),
    "branch_id" VARCHAR,

    CONSTRAINT "person_information_pkey" PRIMARY KEY ("person_information_id")
);

-- CreateIndex
CREATE INDEX "customer_password_idx" ON "customer" USING HASH ("password");

-- CreateIndex
CREATE INDEX "employee_password_idx" ON "employee" USING HASH ("password");

-- CreateIndex
CREATE UNIQUE INDEX "person_information_citizen_id_idx" ON "person_information"("citizen_id");

-- CreateIndex
CREATE UNIQUE INDEX "person_information_telephone_idx" ON "person_information"("telephone");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "dentist"("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_hn_fkey" FOREIGN KEY ("hn") REFERENCES "patient"("hn") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_nv_operation_id_fkey" FOREIGN KEY ("nv_operation_id") REFERENCES "treatment_nv_operation"("nv_operation_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_owner_account_fkey" FOREIGN KEY ("owner_account") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_provice_id_fkey" FOREIGN KEY ("provice_id") REFERENCES "provice"("provice_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_stock" ADD CONSTRAINT "clinic_stock_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_stock" ADD CONSTRAINT "clinic_stock_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_stock" ADD CONSTRAINT "clinic_stock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "medicine"("medicine_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinic_stock" ADD CONSTRAINT "clinic_stock_item_id_fkey1" FOREIGN KEY ("item_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "person_information"("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist" ADD CONSTRAINT "dentist_expert_type_id_fkey" FOREIGN KEY ("expert_type_id") REFERENCES "expert_type"("expert_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist" ADD CONSTRAINT "dentist_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "person_information"("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist_workday" ADD CONSTRAINT "dentist_workday_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist_workday" ADD CONSTRAINT "dentist_workday_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "dentist"("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentist_workday" ADD CONSTRAINT "dentist_workday_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispensing_medicine" ADD CONSTRAINT "dispensing_medicine_clinic_stock_id_fkey" FOREIGN KEY ("clinic_stock_id") REFERENCES "clinic_stock"("clinic_stock_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispensing_medicine" ADD CONSTRAINT "dispensing_medicine_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "person_information"("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("position_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_type" ADD CONSTRAINT "expert_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_type" ADD CONSTRAINT "expert_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_request" ADD CONSTRAINT "lab_request_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_request" ADD CONSTRAINT "lab_request_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_request" ADD CONSTRAINT "lab_request_vender_id_fkey" FOREIGN KEY ("vender_id") REFERENCES "lab_vender"("vender_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_vender" ADD CONSTRAINT "lab_vender_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_vender" ADD CONSTRAINT "lab_vender_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_vender" ADD CONSTRAINT "lab_vender_provice_id_fkey" FOREIGN KEY ("provice_id") REFERENCES "provice"("provice_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_medicine_type_id_fkey" FOREIGN KEY ("medicine_type_id") REFERENCES "medicine_type"("medicine_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_type" ADD CONSTRAINT "medicine_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_type" ADD CONSTRAINT "medicine_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_type" ADD CONSTRAINT "operation_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_type" ADD CONSTRAINT "operation_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "person_information"("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_tag" ADD CONSTRAINT "patient_tag_hn_fkey" FOREIGN KEY ("hn") REFERENCES "patient"("hn") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_tag" ADD CONSTRAINT "patient_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag_list"("tag_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_payment" ADD CONSTRAINT "receipt_payment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_payment" ADD CONSTRAINT "receipt_payment_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "receipt"("receipt_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_product" ADD CONSTRAINT "receipt_product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_product" ADD CONSTRAINT "receipt_product_clinic_stock_id_fkey" FOREIGN KEY ("clinic_stock_id") REFERENCES "clinic_stock"("clinic_stock_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_product" ADD CONSTRAINT "receipt_product_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "receipt"("receipt_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisition_product" ADD CONSTRAINT "requisition_product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisition_product" ADD CONSTRAINT "requisition_product_clinic_stock_id_fkey" FOREIGN KEY ("clinic_stock_id") REFERENCES "clinic_stock"("clinic_stock_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisition_product" ADD CONSTRAINT "requisition_product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_list" ADD CONSTRAINT "tag_list_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_list" ADD CONSTRAINT "tag_list_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "dentist"("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_hn_fkey" FOREIGN KEY ("hn") REFERENCES "patient"("hn") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_document" ADD CONSTRAINT "treatment_document_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_document" ADD CONSTRAINT "treatment_document_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_nv" ADD CONSTRAINT "treatment_nv_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_nv" ADD CONSTRAINT "treatment_nv_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_nv_operation" ADD CONSTRAINT "treatment_nv_operation_operation_type_id_fkey" FOREIGN KEY ("operation_type_id") REFERENCES "operation_type"("operation_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_nv_operation" ADD CONSTRAINT "treatment_nv_operation_refer_denstist_expert_type_id_fkey" FOREIGN KEY ("refer_denstist_expert_type_id") REFERENCES "expert_type"("expert_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_nv_operation" ADD CONSTRAINT "treatment_nv_operation_treatment_nv_id_fkey" FOREIGN KEY ("treatment_nv_id") REFERENCES "treatment_nv"("treatment_nv_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_operation" ADD CONSTRAINT "treatment_operation_operation_type_id_fkey" FOREIGN KEY ("operation_type_id") REFERENCES "operation_type"("operation_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_operation" ADD CONSTRAINT "treatment_operation_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_record_edit_history" ADD CONSTRAINT "treatment_record_edit_history_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "dentist"("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_record_edit_history" ADD CONSTRAINT "treatment_record_edit_history_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_record_template" ADD CONSTRAINT "treatment_record_template_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "dentist"("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_information" ADD CONSTRAINT "person_information_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch"("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_information" ADD CONSTRAINT "person_information_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_information" ADD CONSTRAINT "person_information_edit_by_fkey1" FOREIGN KEY ("edit_by") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_information" ADD CONSTRAINT "person_information_provice_id_fkey" FOREIGN KEY ("provice_id") REFERENCES "provice"("provice_id") ON DELETE NO ACTION ON UPDATE CASCADE;
