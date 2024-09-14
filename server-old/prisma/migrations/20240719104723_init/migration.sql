/*
  Warnings:

  - The values [counter_staff] on the enum `roles` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "roles_new" AS ENUM ('admin', 'dentist', 'employee', 'manager', 'owner', 'developer');
ALTER TABLE "developer" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "developer" ALTER COLUMN "role" TYPE "roles_new" USING ("role"::text::"roles_new");
ALTER TABLE "person_information" ALTER COLUMN "role" TYPE "roles_new" USING ("role"::text::"roles_new");
ALTER TYPE "roles" RENAME TO "roles_old";
ALTER TYPE "roles_new" RENAME TO "roles";
DROP TYPE "roles_old";
ALTER TABLE "developer" ALTER COLUMN "role" SET DEFAULT 'developer';
COMMIT;
