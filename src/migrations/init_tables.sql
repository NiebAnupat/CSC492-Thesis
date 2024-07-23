CREATE TABLE "public"."_prisma_migrations" ( 
  "id" VARCHAR(36) NOT NULL,
  "checksum" VARCHAR(64) NOT NULL,
  "finished_at" TIMESTAMP WITH TIME ZONE NULL,
  "migration_name" VARCHAR(255) NOT NULL,
  "logs" TEXT NULL,
  "rolled_back_at" TIMESTAMP WITH TIME ZONE NULL,
  "started_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() ,
  "applied_steps_count" INTEGER NOT NULL DEFAULT 0 ,
  CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "public"."appointment" ( 
  "appointment_id" VARCHAR NOT NULL,
  "hn" VARCHAR NULL,
  "dentist_id" VARCHAR NULL,
  "appointment_date" DATE NULL,
  "appointment_time" TIME WITHOUT TIME ZONE NULL,
  "is_nv_refer" BOOLEAN NULL DEFAULT false ,
  "nv_operation_id" INTEGER NULL,
  "quantity" INTEGER NULL DEFAULT 1 ,
  "is_notify" BOOLEAN NULL DEFAULT false ,
  "status" USER-DEFINED NULL DEFAULT 'pending'::appointment_status ,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "appointment_pkey" PRIMARY KEY ("appointment_id")
);
CREATE TABLE "public"."audit_log" ( 
  "audit_log_id" SERIAL,
  "action" USER-DEFINED NULL,
  "table_name" VARCHAR NULL,
  "row_id" VARCHAR NULL,
  "old_value" JSON NULL,
  "new_value" JSON NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "audit_log_pkey" PRIMARY KEY ("audit_log_id")
);
CREATE TABLE "public"."branch" ( 
  "address_line_1" TEXT NULL,
  "address_line_2" TEXT NULL,
  "provice_id" INTEGER NULL,
  "telephone" CHARACTER(10) NOT NULL,
  "manager_id" VARCHAR NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "clinic_id" INTEGER NULL,
  "branch_display_id" VARCHAR NOT NULL,
  "branch_id" SERIAL,
  "logo_filename" VARCHAR NULL,
  "branch_name_en" VARCHAR NOT NULL,
  "branch_name_th" VARCHAR NOT NULL,
  "is_deleted" BOOLEAN NOT NULL DEFAULT false ,
  CONSTRAINT "branch_pkey" PRIMARY KEY ("branch_id")
);
CREATE TABLE "public"."clinic" ( 
  "clinic_id" SERIAL,
  "clinic_description" TEXT NULL,
  "logo_filename" VARCHAR NOT NULL,
  "owner_id" VARCHAR NOT NULL,
  "clinic_initial" VARCHAR NOT NULL,
  "clinic_name_en" VARCHAR NOT NULL,
  "clinic_name_th" VARCHAR NOT NULL,
  CONSTRAINT "clinic_pkey" PRIMARY KEY ("clinic_id")
);
CREATE TABLE "public"."clinic_stock" ( 
  "clinic_stock_id" VARCHAR NOT NULL,
  "stock_type" USER-DEFINED NOT NULL,
  "item_id" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 0 ,
  "unit_price" NUMERIC NOT NULL DEFAULT 0 ,
  "minimun_quantity" INTEGER NOT NULL DEFAULT 1 ,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "clinic_stock_pkey" PRIMARY KEY ("clinic_stock_id")
);
CREATE TABLE "public"."customer" ( 
  "customer_id" VARCHAR NOT NULL,
  "provider" USER-DEFINED NULL,
  "email" VARCHAR NOT NULL,
  "password" VARCHAR NULL,
  "person_information_id" INTEGER NOT NULL,
  "package" USER-DEFINED NOT NULL DEFAULT 'free'::packages ,
  CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);
CREATE TABLE "public"."dentist" ( 
  "dentist_id" VARCHAR NOT NULL,
  "password" VARCHAR NULL,
  "dentist_certificate_number" VARCHAR NULL,
  "expert_type_id" INTEGER NULL,
  "dentist_fee_rate" NUMERIC NOT NULL DEFAULT 0.5 ,
  "default_lab_rate" NUMERIC NOT NULL DEFAULT 0.5 ,
  "person_information_id" INTEGER NULL,
  "branch_id" INTEGER NULL,
  CONSTRAINT "dentist_pkey" PRIMARY KEY ("dentist_id")
);
CREATE TABLE "public"."dentist_workday" ( 
  "dentist_workday_id" SERIAL,
  "dentist_id" VARCHAR NULL,
  "day" USER-DEFINED NULL,
  "time_start" TIME WITHOUT TIME ZONE NULL,
  "time_end" TIME WITHOUT TIME ZONE NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "dentist_workday_pkey" PRIMARY KEY ("dentist_workday_id")
);
CREATE TABLE "public"."developer" ( 
  "developer_id" SERIAL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" USER-DEFINED NOT NULL DEFAULT 'developer'::roles ,
  "is_active" BOOLEAN NOT NULL DEFAULT true ,
  CONSTRAINT "developer_pkey" PRIMARY KEY ("developer_id")
);
CREATE TABLE "public"."dispensing_medicine" ( 
  "dispensing_id" SERIAL,
  "treatment_id" VARCHAR NULL,
  "clinic_stock_id" VARCHAR NULL,
  "quantity" INTEGER NULL,
  CONSTRAINT "dispensing_medicine_pkey" PRIMARY KEY ("dispensing_id")
);
CREATE TABLE "public"."employee" ( 
  "employee_id" VARCHAR NOT NULL,
  "password" VARCHAR NOT NULL,
  "position_id" INTEGER NULL,
  "person_information_id" INTEGER NOT NULL,
  "employee_uid" VARCHAR NOT NULL,
  "branch_id" INTEGER NULL,
  CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_uid")
);
CREATE TABLE "public"."expert_type" ( 
  "expert_type_id" SERIAL,
  "expert_type_name" VARCHAR NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "expert_type_pkey" PRIMARY KEY ("expert_type_id")
);
CREATE TABLE "public"."lab_request" ( 
  "lab_request_id" SERIAL,
  "treatment_id" VARCHAR NULL,
  "vender_id" INTEGER NULL,
  "lab_title" VARCHAR NULL,
  "lab_description" TEXT NULL,
  "request_date" DATE NULL,
  "receive_date" DATE NULL,
  "cost" NUMERIC NULL,
  "override_dentist_lab_rate" NUMERIC NULL,
  "is_receive" BOOLEAN NULL DEFAULT false ,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  CONSTRAINT "lab_request_pkey" PRIMARY KEY ("lab_request_id")
);
CREATE TABLE "public"."lab_vender" ( 
  "vender_id" SERIAL,
  "vender_name" VARCHAR NULL,
  "vender_description" TEXT NULL,
  "address_line_1" TEXT NULL,
  "address_line_2" TEXT NULL,
  "provice_id" INTEGER NULL,
  "telephone" CHARACTER(10) NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "lab_vender_pkey" PRIMARY KEY ("vender_id")
);
CREATE TABLE "public"."medicine" ( 
  "medicine_id" SERIAL,
  "medicine_name" VARCHAR NULL,
  "medicine_type_id" INTEGER NULL,
  "instruction" TEXT NULL,
  "precaution" TEXT NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "medicine_pkey" PRIMARY KEY ("medicine_id")
);
CREATE TABLE "public"."medicine_type" ( 
  "medicine_type_id" SERIAL,
  "medicine_type_name" VARCHAR NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "medicine_type_pkey" PRIMARY KEY ("medicine_type_id")
);
CREATE TABLE "public"."operation_type" ( 
  "operation_type_id" SERIAL,
  "operation_type_name" VARCHAR NULL,
  "default_time_spend" NUMERIC NULL DEFAULT 15 ,
  "default_unit_price" NUMERIC NULL DEFAULT 0 ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "operation_type_pkey" PRIMARY KEY ("operation_type_id")
);
CREATE TABLE "public"."patient" ( 
  "hn" VARCHAR NOT NULL,
  "person_information_id" INTEGER NULL,
  "current_medication" TEXT NULL,
  "drug_allergy" TEXT NULL,
  "congenital_disease" TEXT NULL,
  "is_pregnant" BOOLEAN NOT NULL DEFAULT false ,
  "contact_person_name" VARCHAR NULL,
  "contact_person_relation" VARCHAR NULL,
  "contact_person_telephone" CHARACTER(10) NULL,
  "branch_id" INTEGER NULL,
  CONSTRAINT "patient_pkey" PRIMARY KEY ("hn")
);
CREATE TABLE "public"."patient_tag" ( 
  "patient_tag_record_id" SERIAL,
  "tag_id" INTEGER NULL,
  "hn" VARCHAR NULL,
  CONSTRAINT "patient_tag_pkey" PRIMARY KEY ("patient_tag_record_id")
);
CREATE TABLE "public"."person_information" ( 
  "person_information_id" SERIAL,
  "nationality" VARCHAR NULL,
  "citizen_id" CHARACTER(13) NULL,
  "gender" USER-DEFINED NULL,
  "prefix" VARCHAR NULL,
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "telephone" CHARACTER(10) NULL,
  "address_line_1" TEXT NULL,
  "address_line_2" TEXT NULL,
  "provice_id" INTEGER NULL,
  "hire_date" DATE NULL,
  "birth_date" DATE NULL,
  "avatar" VARCHAR NULL,
  "role" USER-DEFINED NOT NULL,
  "create_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  "edit_by" VARCHAR NULL,
  "deleted_at" TIMESTAMP NULL,
  CONSTRAINT "person_information_pkey" PRIMARY KEY ("person_information_id")
);
CREATE TABLE "public"."position" ( 
  "position_id" SERIAL,
  "position_name" VARCHAR NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "position_pkey" PRIMARY KEY ("position_id")
);
CREATE TABLE "public"."product" ( 
  "product_id" SERIAL,
  "product_name" VARCHAR NULL,
  "product_type" USER-DEFINED NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);
CREATE TABLE "public"."provice" ( 
  "provice_id" SERIAL,
  "province_name_th" VARCHAR NOT NULL,
  "province_name_en" VARCHAR NOT NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  CONSTRAINT "provice_pkey" PRIMARY KEY ("provice_id")
);
CREATE TABLE "public"."receipt" ( 
  "receipt_id" VARCHAR NOT NULL,
  "treatment_id" VARCHAR NULL,
  "override_dentist_fee_rate" NUMERIC NULL,
  "total_price" NUMERIC NULL DEFAULT 0 ,
  "discount" NUMERIC NULL DEFAULT 0 ,
  "arrearage" NUMERIC NULL DEFAULT 0 ,
  "is_paid" BOOLEAN NOT NULL DEFAULT false ,
  "is_cancel" BOOLEAN NOT NULL DEFAULT false ,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  "employee_uid" VARCHAR NOT NULL,
  CONSTRAINT "receipt_pkey" PRIMARY KEY ("receipt_id")
);
CREATE TABLE "public"."receipt_payment" ( 
  "receipt_payment_id" SERIAL,
  "receipt_id" VARCHAR NULL,
  "payment_amount" NUMERIC NULL,
  "payment_type" USER-DEFINED NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "edit_by" VARCHAR NULL,
  "deleted_at" TIMESTAMP NULL,
  CONSTRAINT "receipt_payment_pkey" PRIMARY KEY ("receipt_payment_id")
);
CREATE TABLE "public"."receipt_product" ( 
  "receipt_product_id" SERIAL,
  "receipt_id" VARCHAR NULL,
  "clinic_stock_id" VARCHAR NULL,
  "quantity" INTEGER NULL,
  "override_unit_price" NUMERIC NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "edit_by" VARCHAR NULL,
  CONSTRAINT "receipt_product_pkey" PRIMARY KEY ("receipt_product_id")
);
CREATE TABLE "public"."requisition_product" ( 
  "requisition_id" VARCHAR NOT NULL,
  "clinic_stock_id" VARCHAR NULL,
  "quantity" INTEGER NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "requisition_product_pkey" PRIMARY KEY ("requisition_id")
);
CREATE TABLE "public"."tag_list" ( 
  "tag_id" SERIAL,
  "tag_name" VARCHAR NULL,
  "tag_color" VARCHAR NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "tag_list_pkey" PRIMARY KEY ("tag_id")
);
CREATE TABLE "public"."treatment" ( 
  "treatment_id" VARCHAR NOT NULL,
  "hn" VARCHAR NULL,
  "dentist_id" VARCHAR NULL,
  "subject" TEXT NULL,
  "objective" TEXT NULL,
  "assessment" TEXT NULL,
  "plan" TEXT NULL,
  "recall_date" DATE NULL,
  "is_noitfy_recall" BOOLEAN NULL DEFAULT false ,
  "note_to_counter_staff" TEXT NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "branch_id" INTEGER NOT NULL,
  CONSTRAINT "treatment_pkey" PRIMARY KEY ("treatment_id")
);
CREATE TABLE "public"."treatment_document" ( 
  "document_id" SERIAL,
  "treatment_id" VARCHAR NULL,
  "document_name" VARCHAR NULL,
  "document_url" VARCHAR NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  CONSTRAINT "treatment_document_pkey" PRIMARY KEY ("document_id")
);
CREATE TABLE "public"."treatment_nv" ( 
  "treatment_nv_id" SERIAL,
  "treatment_id" VARCHAR NULL,
  "nv_detail" TEXT NULL,
  "date_notify" DATE NULL,
  "is_notify" BOOLEAN NULL,
  "create_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "update_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  "deleted_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  CONSTRAINT "treatment_nv_pkey" PRIMARY KEY ("treatment_nv_id")
);
CREATE TABLE "public"."treatment_nv_operation" ( 
  "nv_operation_id" SERIAL,
  "treatment_nv_id" INTEGER NULL,
  "operation_type_id" INTEGER NULL,
  "tooth_position" VARCHAR NULL,
  "refer_denstist_expert_type_id" INTEGER NULL,
  "is_appointment" BOOLEAN NULL DEFAULT false ,
  CONSTRAINT "treatment_nv_operation_pkey" PRIMARY KEY ("nv_operation_id")
);
CREATE TABLE "public"."treatment_operation" ( 
  "treatment_operation_id" SERIAL,
  "treatment_id" VARCHAR NULL,
  "operation_type_id" INTEGER NULL,
  "quantity" INTEGER NULL DEFAULT 1 ,
  "tooth_position" VARCHAR NULL,
  "override_unit_price" NUMERIC NULL,
  CONSTRAINT "treatment_operation_pkey" PRIMARY KEY ("treatment_operation_id")
);
CREATE TABLE "public"."treatment_record_edit_history" ( 
  "record_edit_history_id" SERIAL,
  "treatment_id" VARCHAR NULL,
  "edit_at" TIMESTAMP NULL,
  "edit_by" VARCHAR NULL,
  "edit_field" USER-DEFINED NULL,
  "old_value" TEXT NULL,
  "new_value" TEXT NULL,
  CONSTRAINT "treatment_record_edit_history_pkey" PRIMARY KEY ("record_edit_history_id")
);
CREATE TABLE "public"."treatment_record_template" ( 
  "record_template_id" SERIAL,
  "field" USER-DEFINED NULL,
  "value" TEXT NULL,
  "create_at" TIMESTAMP NULL,
  "create_by" VARCHAR NULL,
  CONSTRAINT "treatment_record_template_pkey" PRIMARY KEY ("record_template_id")
);
ALTER TABLE "public"."appointment" ADD CONSTRAINT "appointment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."appointment" ADD CONSTRAINT "appointment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."appointment" ADD CONSTRAINT "appointment_nv_operation_id_fkey" FOREIGN KEY ("nv_operation_id") REFERENCES "public"."treatment_nv_operation" ("nv_operation_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."appointment" ADD CONSTRAINT "appointment_hn_fkey" FOREIGN KEY ("hn") REFERENCES "public"."patient" ("hn") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."appointment" ADD CONSTRAINT "appointment_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "public"."dentist" ("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."audit_log" ADD CONSTRAINT "audit_log_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."audit_log" ADD CONSTRAINT "audit_log_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_provice_id_fkey" FOREIGN KEY ("provice_id") REFERENCES "public"."provice" ("provice_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinic" ("clinic_id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."clinic" ADD CONSTRAINT "clinic_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."customer" ("customer_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."clinic_stock" ADD CONSTRAINT "clinic_stock_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."clinic_stock" ADD CONSTRAINT "clinic_stock_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."clinic_stock" ADD CONSTRAINT "clinic_stock_item_id_fkey1" FOREIGN KEY ("item_id") REFERENCES "public"."product" ("product_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."clinic_stock" ADD CONSTRAINT "clinic_stock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."medicine" ("medicine_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "public"."person_information" ("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."dentist" ADD CONSTRAINT "dentist_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."dentist" ADD CONSTRAINT "dentist_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "public"."person_information" ("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."dentist" ADD CONSTRAINT "dentist_expert_type_id_fkey" FOREIGN KEY ("expert_type_id") REFERENCES "public"."expert_type" ("expert_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."dentist_workday" ADD CONSTRAINT "dentist_workday_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."dentist_workday" ADD CONSTRAINT "dentist_workday_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."dentist_workday" ADD CONSTRAINT "dentist_workday_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "public"."dentist" ("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."dispensing_medicine" ADD CONSTRAINT "dispensing_medicine_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatment" ("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."dispensing_medicine" ADD CONSTRAINT "dispensing_medicine_clinic_stock_id_fkey" FOREIGN KEY ("clinic_stock_id") REFERENCES "public"."clinic_stock" ("clinic_stock_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."employee" ADD CONSTRAINT "employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."employee" ADD CONSTRAINT "employee_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."position" ("position_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."employee" ADD CONSTRAINT "employee_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "public"."person_information" ("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."expert_type" ADD CONSTRAINT "expert_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."expert_type" ADD CONSTRAINT "expert_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."lab_request" ADD CONSTRAINT "lab_request_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."lab_request" ADD CONSTRAINT "lab_request_vender_id_fkey" FOREIGN KEY ("vender_id") REFERENCES "public"."lab_vender" ("vender_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."lab_request" ADD CONSTRAINT "lab_request_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatment" ("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."lab_vender" ADD CONSTRAINT "lab_vender_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."lab_vender" ADD CONSTRAINT "lab_vender_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."lab_vender" ADD CONSTRAINT "lab_vender_provice_id_fkey" FOREIGN KEY ("provice_id") REFERENCES "public"."provice" ("provice_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."medicine" ADD CONSTRAINT "medicine_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."medicine" ADD CONSTRAINT "medicine_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."medicine" ADD CONSTRAINT "medicine_medicine_type_id_fkey" FOREIGN KEY ("medicine_type_id") REFERENCES "public"."medicine_type" ("medicine_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."medicine_type" ADD CONSTRAINT "medicine_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."medicine_type" ADD CONSTRAINT "medicine_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."operation_type" ADD CONSTRAINT "operation_type_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."operation_type" ADD CONSTRAINT "operation_type_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."patient" ADD CONSTRAINT "patient_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."patient" ADD CONSTRAINT "patient_person_information_id_fkey" FOREIGN KEY ("person_information_id") REFERENCES "public"."person_information" ("person_information_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."patient_tag" ADD CONSTRAINT "patient_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tag_list" ("tag_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."patient_tag" ADD CONSTRAINT "patient_tag_hn_fkey" FOREIGN KEY ("hn") REFERENCES "public"."patient" ("hn") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."person_information" ADD CONSTRAINT "person_information_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."person_information" ADD CONSTRAINT "person_information_provice_id_fkey" FOREIGN KEY ("provice_id") REFERENCES "public"."provice" ("provice_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."position" ADD CONSTRAINT "position_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."product" ADD CONSTRAINT "product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."product" ADD CONSTRAINT "product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt" ADD CONSTRAINT "receipt_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt" ADD CONSTRAINT "receipt_employee_uid_fkey" FOREIGN KEY ("employee_uid") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt" ADD CONSTRAINT "receipt_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt" ADD CONSTRAINT "receipt_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatment" ("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt_payment" ADD CONSTRAINT "receipt_payment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt_payment" ADD CONSTRAINT "receipt_payment_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "public"."receipt" ("receipt_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt_product" ADD CONSTRAINT "receipt_product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt_product" ADD CONSTRAINT "receipt_product_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "public"."receipt" ("receipt_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."receipt_product" ADD CONSTRAINT "receipt_product_clinic_stock_id_fkey" FOREIGN KEY ("clinic_stock_id") REFERENCES "public"."clinic_stock" ("clinic_stock_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."requisition_product" ADD CONSTRAINT "requisition_product_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."requisition_product" ADD CONSTRAINT "requisition_product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."requisition_product" ADD CONSTRAINT "requisition_product_clinic_stock_id_fkey" FOREIGN KEY ("clinic_stock_id") REFERENCES "public"."clinic_stock" ("clinic_stock_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."tag_list" ADD CONSTRAINT "tag_list_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."tag_list" ADD CONSTRAINT "tag_list_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment" ADD CONSTRAINT "treatment_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment" ADD CONSTRAINT "treatment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branch" ("branch_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment" ADD CONSTRAINT "treatment_hn_fkey" FOREIGN KEY ("hn") REFERENCES "public"."patient" ("hn") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment" ADD CONSTRAINT "treatment_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "public"."dentist" ("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_document" ADD CONSTRAINT "treatment_document_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_document" ADD CONSTRAINT "treatment_document_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatment" ("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_nv" ADD CONSTRAINT "treatment_nv_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."employee" ("employee_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_nv" ADD CONSTRAINT "treatment_nv_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatment" ("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_nv_operation" ADD CONSTRAINT "treatment_nv_operation_treatment_nv_id_fkey" FOREIGN KEY ("treatment_nv_id") REFERENCES "public"."treatment_nv" ("treatment_nv_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_nv_operation" ADD CONSTRAINT "treatment_nv_operation_refer_denstist_expert_type_id_fkey" FOREIGN KEY ("refer_denstist_expert_type_id") REFERENCES "public"."expert_type" ("expert_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_nv_operation" ADD CONSTRAINT "treatment_nv_operation_operation_type_id_fkey" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_type" ("operation_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_operation" ADD CONSTRAINT "treatment_operation_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatment" ("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_operation" ADD CONSTRAINT "treatment_operation_operation_type_id_fkey" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_type" ("operation_type_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_record_edit_history" ADD CONSTRAINT "treatment_record_edit_history_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatment" ("treatment_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_record_edit_history" ADD CONSTRAINT "treatment_record_edit_history_edit_by_fkey" FOREIGN KEY ("edit_by") REFERENCES "public"."dentist" ("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."treatment_record_template" ADD CONSTRAINT "treatment_record_template_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "public"."dentist" ("dentist_id") ON DELETE NO ACTION ON UPDATE CASCADE;
