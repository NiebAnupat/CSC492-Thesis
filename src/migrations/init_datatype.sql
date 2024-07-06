CREATE TYPE "packages" AS ENUM (
  'basic',
  'premium',
  'vip'
);

CREATE TYPE "customer_providers" AS ENUM (
  'local',
  'google'
);

CREATE TYPE "genders" AS ENUM (
  'male',
  'female'
);

CREATE TYPE "days" AS ENUM (
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
);

CREATE TYPE "product_types" AS ENUM (
  'consume',
  'sale'
);

CREATE TYPE "stock_types" AS ENUM (
  'product',
  'medicine'
);

CREATE TYPE "treatment_record_fields" AS ENUM (
  'subject',
  'objective',
  'assessment',
  'plan'
);

CREATE TYPE "payment_types" AS ENUM (
  'cash',
  'credit_card',
  'bank_transfer',
  'sso'
);

CREATE TYPE "appointment_status" AS ENUM (
  'pending',
  'cancel',
  'success'
);

CREATE TYPE "actions" AS ENUM (
  'create',
  'update',
  'insert',
  'delete'
);