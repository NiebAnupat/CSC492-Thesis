CREATE TABLE "person_information" (
  "person_information_id" serial,
  "nationality" varchar ,
  "citizen_id" char(13) NOT NULL UNIQUE,
  "gender" genders,
  "prefix" varchar,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "telephone" char(10) NOT NULL UNIQUE,
  "address_line_1" text,
  "address_line_2" text,
  "provice_id" integer,
  "hire_date" date,
  "birth_date" date NOT NULL,
  "avatar" varchar,
  "create_at" timestamp DEFAULT (now()) NOT NULL,
  "update_at" timestamp DEFAULT (now()) NOT NULL,
  "edit_by" varchar,
  "deleted_at" timestamp,
  "branch_id" varchar,
  PRIMARY KEY ("person_information_id")
);

CREATE TABLE "customer" (
  "customer_id" varchar,
  "customer_provider" customer_providers,
  "customer_google_id" varchar,
  "email" varchar,
  "password" varchar,
  "person_information_id" integer NOT NULL,
  "package" packages DEFAULT 'basic' NOT NULL,
  PRIMARY KEY ("customer_id")
);

CREATE TABLE "provice" (
  "provice_id" serial,
  "province_name_th" varchar NOT NULL,
  "province_name_en" varchar NOT NULL,
  PRIMARY KEY ("provice_id")
);

CREATE TABLE "branch" (
  "branch_id" varchar,
  "branch_name" varchar NOT NULL,
  "address_line_1" text,
  "address_line_2" text,
  "provice_id" integer,
  "telephone" char(10) NOT NULL,
  "image_url" varchar,
  "manager_id" varchar NOT NULL,
  "owner_account" varchar NOT NULL,
  PRIMARY KEY ("branch_id")
);

CREATE TABLE "employee" (
  "employee_id" varchar,
  "password" varchar NOT NULL,
  "position_id" integer,
  "person_information_id" integer NOT NULL,
  PRIMARY KEY ("employee_id")
);

CREATE TABLE "position" (
  "position_id" serial,
  "position_name" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("position_id")
);

CREATE TABLE "dentist" (
  "dentist_id" varchar,
  "password" varchar,
  "dentist_certificate_number" varchar,
  "expert_type_id" integer,
  "dentist_fee_rate" numeric NOT NULL DEFAULT 0.5,
  "default_lab_rate" numeric NOT NULL DEFAULT 0.5,
  "person_information_id" integer,
  PRIMARY KEY ("dentist_id")
);

CREATE TABLE "expert_type" (
  "expert_type_id" serial,
  "expert_type_name" varchar,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("expert_type_id")
);

CREATE TABLE "dentist_workday" (
  "dentist_workday_id" serial,
  "dentist_id" varchar,
  "day" days,
  "time_start" time,
  "time_end" time,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("dentist_workday_id")
);

CREATE TABLE "patient" (
  "hn" varchar,
  "person_information_id" integer,
  "current_medication" text,
  "drug_allergy" text,
  "congenital_disease" text,
  "is_pregnant" bool NOT NULL DEFAULT false,
  "contact_person_name" varchar,
  "contact_person_relation" varchar,
  "contact_person_telephone" char(10),
  PRIMARY KEY ("hn")
);

CREATE TABLE "tag_list" (
  "tag_id" serial,
  "tag_name" varchar,
  "tag_color" varchar,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("tag_id")
);

CREATE TABLE "patient_tag" (
  "patient_tag_record_id" serial,
  "tag_id" integer,
  "hn" varchar,
  PRIMARY KEY ("patient_tag_record_id")
);

CREATE TABLE "product" (
  "product_id" serial,
  "product_name" varchar,
  "product_type" product_types,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("product_id")
);

CREATE TABLE "requisition_product" (
  "requisition_id" varchar,
  "clinic_stock_id" varchar,
  "quantity" integer,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("requisition_id")
);

CREATE TABLE "medicine" (
  "medicine_id" serial,
  "medicine_name" varchar,
  "medicine_type_id" integer,
  "instruction" text,
  "precaution" text,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("medicine_id")
);

CREATE TABLE "medicine_type" (
  "medicine_type_id" serial,
  "medicine_type_name" varchar,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("medicine_type_id")
);

CREATE TABLE "clinic_stock" (
  "clinic_stock_id" varchar,
  "stock_type" stock_types NOT NULL,
  "item_id" integer,
  "quantity" integer NOT NULL DEFAULT 0,
  "unit_price" numeric NOT NULL DEFAULT 0,
  "minimun_quantity" integer NOT NULL DEFAULT 1,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("clinic_stock_id")
);

CREATE TABLE "operation_type" (
  "operation_type_id" serial,
  "operation_type_name" varchar,
  "default_time_spend" numeric DEFAULT 15,
  "default_unit_price" numeric DEFAULT 0,
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("operation_type_id")
);

CREATE TABLE "treatment" (
  "treatment_id" varchar,
  "hn" varchar,
  "dentist_id" varchar,
  "subject" text,
  "objective" text,
  "assessment" text,
  "plan" text,
  "recall_date" date DEFAULT null,
  "is_noitfy_recall" bool DEFAULT false,
  "note_to_counter_staff" text,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("treatment_id")
);

CREATE TABLE "treatment_nv" (
  "treatment_nv_id" serial,
  "treatment_id" varchar,
  "nv_detail" text,
  "date_notify" date,
  "is_notify" bool,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  PRIMARY KEY ("treatment_nv_id")
);

CREATE TABLE "treatment_nv_operation" (
  "nv_operation_id" serial,
  "treatment_nv_id" integer,
  "operation_type_id" integer,
  "tooth_position" varchar,
  "refer_denstist_expert_type_id" integer,
  "is_appointment" bool DEFAULT false,
  PRIMARY KEY ("nv_operation_id")
);

CREATE TABLE "treatment_record_template" (
  "record_template_id" serial,
  "field" treatment_record_fields,
  "value" text,
  "create_at" timestamp,
  "create_by" varchar,
  PRIMARY KEY ("record_template_id")
);

CREATE TABLE "treatment_record_edit_history" (
  "record_edit_history_id" serial,
  "treatment_id" varchar,
  "edit_at" timestamp,
  "edit_by" varchar,
  "edit_field" treatment_record_fields,
  "old_value" text,
  "new_value" text,
  PRIMARY KEY ("record_edit_history_id")
);

CREATE TABLE "treatment_document" (
  "document_id" serial,
  "treatment_id" varchar,
  "document_name" varchar,
  "document_url" varchar,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  PRIMARY KEY ("document_id")
);

CREATE TABLE "treatment_operation" (
  "treatment_operation_id" serial,
  "treatment_id" varchar,
  "operation_type_id" integer,
  "quantity" integer DEFAULT 1,
  "tooth_position" varchar DEFAULT null,
  "override_unit_price" numeric DEFAULT null,
  PRIMARY KEY ("treatment_operation_id")
);

CREATE TABLE "dispensing_medicine" (
  "dispensing_id" serial,
  "treatment_id" varchar,
  "clinic_stock_id" varchar,
  "quantity" integer,
  PRIMARY KEY ("dispensing_id")
);

CREATE TABLE "lab_vender" (
  "vender_id" serial,
  "vender_name" varchar,
  "vender_description" text,
  "address_line_1" text,
  "address_line_2" text,
  "provice_id" integer,
  "telephone" char(10),
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("vender_id")
);

CREATE TABLE "lab_request" (
  "lab_request_id" serial,
  "treatment_id" varchar,
  "vender_id" integer,
  "lab_title" varchar,
  "lab_description" text,
  "request_date" date,
  "receive_date" date,
  "cost" numeric,
  "override_dentist_lab_rate" numeric,
  "is_receive" bool DEFAULT false,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  PRIMARY KEY ("lab_request_id")
);

CREATE TABLE "receipt" (
  "receipt_id" varchar,
  "treatment_id" varchar DEFAULT null,
  "override_dentist_fee_rate" numeric DEFAULT null,
  "total_price" numeric DEFAULT 0,
  "discount" numeric DEFAULT 0,
  "arrearage" numeric DEFAULT 0,
  "is_paid" bool NOT NULL DEFAULT false,
  "is_cancel" bool NOT NULL DEFAULT false,
  "employee_id" varchar NOT NULL,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar NOT NULL,
  PRIMARY KEY ("receipt_id")
);

CREATE TABLE "receipt_payment" (
  "receipt_payment_id" serial,
  "receipt_id" varchar,
  "payment_amount" numeric,
  "payment_type" payment_types,
  PRIMARY KEY ("receipt_payment_id")
);

CREATE TABLE "receipt_product" (
  "receipt_product_id" serial,
  "receipt_id" varchar,
  "clinic_stock_id" varchar,
  "quantity" integer,
  "override_unit_price" numeric,
  PRIMARY KEY ("receipt_product_id")
);

CREATE TABLE "appointment" (
  "appointment_id" varchar,
  "hn" varchar,
  "dentist_id" varchar,
  "appointment_date" date,
  "appointment_time" time,
  "is_nv_refer" bool DEFAULT false,
  "nv_operation_id" integer DEFAULT null,
  "quantity" integer DEFAULT 1,
  "is_notify" bool DEFAULT false,
  "status" appointment_status DEFAULT 'pending',
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar NOT NULL,
  PRIMARY KEY ("appointment_id")
);

CREATE TABLE "audit_log" (
  "audit_log_id" serial,
  "action" actions,
  "table_name" varchar,
  "row_id" varchar,
  "old_value" json,
  "new_value" json,
  "create_at" timestamp DEFAULT (now()),
  "edit_by" varchar,
  "branch_id" varchar,
  PRIMARY KEY ("audit_log_id")
);

CREATE UNIQUE INDEX ON "person_information" ("telephone");

CREATE UNIQUE INDEX ON "person_information" ("citizen_id");

CREATE INDEX ON "customer" USING HASH ("password");

CREATE INDEX ON "employee" USING HASH ("password");

COMMENT ON COLUMN "person_information"."create_at" IS 'Create date';

COMMENT ON COLUMN "person_information"."update_at" IS 'Update date';

COMMENT ON COLUMN "customer"."package" IS 'higher package can access more feature';

COMMENT ON COLUMN "expert_type"."create_at" IS 'Create date';

COMMENT ON COLUMN "expert_type"."update_at" IS 'Update date';

COMMENT ON COLUMN "dentist_workday"."create_at" IS 'Create date';

COMMENT ON COLUMN "dentist_workday"."update_at" IS 'Update date';

COMMENT ON COLUMN "tag_list"."create_at" IS 'Create date';

COMMENT ON COLUMN "tag_list"."update_at" IS 'Update date';

COMMENT ON COLUMN "product"."create_at" IS 'Create date';

COMMENT ON COLUMN "product"."update_at" IS 'Update date';

COMMENT ON COLUMN "requisition_product"."create_at" IS 'Create date';

COMMENT ON COLUMN "requisition_product"."update_at" IS 'Update date';

COMMENT ON COLUMN "medicine"."create_at" IS 'Create date';

COMMENT ON COLUMN "medicine"."update_at" IS 'Update date';

COMMENT ON COLUMN "medicine_type"."create_at" IS 'Create date';

COMMENT ON COLUMN "medicine_type"."update_at" IS 'Update date';

COMMENT ON COLUMN "clinic_stock"."create_at" IS 'Create date';

COMMENT ON COLUMN "clinic_stock"."update_at" IS 'Update date';

COMMENT ON COLUMN "operation_type"."update_at" IS 'Update date';

COMMENT ON COLUMN "treatment"."subject" IS 'Symptoms leading to treatment';

COMMENT ON COLUMN "treatment"."objective" IS 'Examination results';

COMMENT ON COLUMN "treatment"."assessment" IS 'Symptoms diagnosed by the doctor';

COMMENT ON COLUMN "treatment"."plan" IS 'Treatment visit detail';

COMMENT ON COLUMN "treatment"."recall_date" IS 'Next treatment recall date';

COMMENT ON COLUMN "treatment"."is_noitfy_recall" IS 'Recall is notify the patient';

COMMENT ON COLUMN "treatment"."note_to_counter_staff" IS 'Note to counter staff';

COMMENT ON COLUMN "treatment"."create_at" IS 'Create date';

COMMENT ON COLUMN "treatment"."update_at" IS 'Update date';

COMMENT ON COLUMN "treatment_nv"."nv_detail" IS 'Details of next visit';

COMMENT ON COLUMN "treatment_nv"."create_at" IS 'Create date';

COMMENT ON COLUMN "treatment_nv"."update_at" IS 'Update date';

COMMENT ON COLUMN "treatment_document"."create_at" IS 'Create date';

COMMENT ON COLUMN "treatment_document"."update_at" IS 'Update date';

COMMENT ON COLUMN "lab_vender"."create_at" IS 'Create date';

COMMENT ON COLUMN "lab_vender"."update_at" IS 'Update date';

COMMENT ON COLUMN "lab_request"."create_at" IS 'Create date';

COMMENT ON COLUMN "lab_request"."update_at" IS 'Update date';

COMMENT ON COLUMN "receipt"."create_at" IS 'Create date';

COMMENT ON COLUMN "receipt"."update_at" IS 'Update date';

COMMENT ON COLUMN "appointment"."is_nv_refer" IS 'Is refer from next visit';

COMMENT ON COLUMN "appointment"."is_notify" IS 'Is appointment notify to patient';

COMMENT ON COLUMN "appointment"."create_at" IS 'Create date';

COMMENT ON COLUMN "appointment"."update_at" IS 'Update date';

COMMENT ON COLUMN "audit_log"."create_at" IS 'Create date';

ALTER TABLE "person_information" ADD FOREIGN KEY ("provice_id") REFERENCES "provice" ("provice_id");

ALTER TABLE "person_information" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "person_information" ADD FOREIGN KEY ("edit_by") REFERENCES "customer" ("customer_id");

ALTER TABLE "person_information" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "customer" ADD FOREIGN KEY ("person_information_id") REFERENCES "person_information" ("person_information_id");

ALTER TABLE "branch" ADD FOREIGN KEY ("provice_id") REFERENCES "provice" ("provice_id");

ALTER TABLE "branch" ADD FOREIGN KEY ("manager_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "branch" ADD FOREIGN KEY ("owner_account") REFERENCES "customer" ("customer_id");

ALTER TABLE "employee" ADD FOREIGN KEY ("position_id") REFERENCES "position" ("position_id");

ALTER TABLE "employee" ADD FOREIGN KEY ("person_information_id") REFERENCES "person_information" ("person_information_id");

ALTER TABLE "position" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "dentist" ADD FOREIGN KEY ("expert_type_id") REFERENCES "expert_type" ("expert_type_id");

ALTER TABLE "dentist" ADD FOREIGN KEY ("person_information_id") REFERENCES "person_information" ("person_information_id");

ALTER TABLE "expert_type" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "expert_type" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "dentist_workday" ADD FOREIGN KEY ("dentist_id") REFERENCES "dentist" ("dentist_id");

ALTER TABLE "dentist_workday" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "dentist_workday" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "patient" ADD FOREIGN KEY ("person_information_id") REFERENCES "person_information" ("person_information_id");

ALTER TABLE "tag_list" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "tag_list" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "patient_tag" ADD FOREIGN KEY ("tag_id") REFERENCES "tag_list" ("tag_id");

ALTER TABLE "patient_tag" ADD FOREIGN KEY ("hn") REFERENCES "patient" ("hn");

ALTER TABLE "product" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "product" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "requisition_product" ADD FOREIGN KEY ("clinic_stock_id") REFERENCES "clinic_stock" ("clinic_stock_id");

ALTER TABLE "requisition_product" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "requisition_product" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "medicine" ADD FOREIGN KEY ("medicine_type_id") REFERENCES "medicine_type" ("medicine_type_id");

ALTER TABLE "medicine" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "medicine" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "medicine_type" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "medicine_type" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "clinic_stock" ADD FOREIGN KEY ("item_id") REFERENCES "medicine" ("medicine_id");

ALTER TABLE "clinic_stock" ADD FOREIGN KEY ("item_id") REFERENCES "product" ("product_id");

ALTER TABLE "clinic_stock" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "clinic_stock" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "operation_type" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "operation_type" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "treatment" ADD FOREIGN KEY ("hn") REFERENCES "patient" ("hn");

ALTER TABLE "treatment" ADD FOREIGN KEY ("dentist_id") REFERENCES "dentist" ("dentist_id");

ALTER TABLE "treatment" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "treatment" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "treatment_nv" ADD FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("treatment_id");

ALTER TABLE "treatment_nv" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "treatment_nv_operation" ADD FOREIGN KEY ("treatment_nv_id") REFERENCES "treatment_nv" ("treatment_nv_id");

ALTER TABLE "treatment_nv_operation" ADD FOREIGN KEY ("operation_type_id") REFERENCES "operation_type" ("operation_type_id");

ALTER TABLE "treatment_nv_operation" ADD FOREIGN KEY ("refer_denstist_expert_type_id") REFERENCES "expert_type" ("expert_type_id");

ALTER TABLE "treatment_record_template" ADD FOREIGN KEY ("create_by") REFERENCES "dentist" ("dentist_id");

ALTER TABLE "treatment_record_edit_history" ADD FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("treatment_id");

ALTER TABLE "treatment_record_edit_history" ADD FOREIGN KEY ("edit_by") REFERENCES "dentist" ("dentist_id");

ALTER TABLE "treatment_document" ADD FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("treatment_id");

ALTER TABLE "treatment_document" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "treatment_operation" ADD FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("treatment_id");

ALTER TABLE "treatment_operation" ADD FOREIGN KEY ("operation_type_id") REFERENCES "operation_type" ("operation_type_id");

ALTER TABLE "dispensing_medicine" ADD FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("treatment_id");

ALTER TABLE "dispensing_medicine" ADD FOREIGN KEY ("clinic_stock_id") REFERENCES "clinic_stock" ("clinic_stock_id");

ALTER TABLE "lab_vender" ADD FOREIGN KEY ("provice_id") REFERENCES "provice" ("provice_id");

ALTER TABLE "lab_vender" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "lab_vender" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "lab_request" ADD FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("treatment_id");

ALTER TABLE "lab_request" ADD FOREIGN KEY ("vender_id") REFERENCES "lab_vender" ("vender_id");

ALTER TABLE "lab_request" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "receipt" ADD FOREIGN KEY ("treatment_id") REFERENCES "treatment" ("treatment_id");

ALTER TABLE "receipt" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "receipt" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "receipt" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "receipt_payment" ADD FOREIGN KEY ("receipt_id") REFERENCES "receipt" ("receipt_id");

ALTER TABLE "receipt_product" ADD FOREIGN KEY ("receipt_id") REFERENCES "receipt" ("receipt_id");

ALTER TABLE "receipt_product" ADD FOREIGN KEY ("clinic_stock_id") REFERENCES "clinic_stock" ("clinic_stock_id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("hn") REFERENCES "patient" ("hn");

ALTER TABLE "appointment" ADD FOREIGN KEY ("dentist_id") REFERENCES "dentist" ("dentist_id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("nv_operation_id") REFERENCES "treatment_nv_operation" ("nv_operation_id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "audit_log" ADD FOREIGN KEY ("edit_by") REFERENCES "employee" ("employee_id");

ALTER TABLE "audit_log" ADD FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id");
