-- DropForeignKey
ALTER TABLE "person_information" DROP CONSTRAINT "person_information_edit_by_fkey1";

-- AlterTable
ALTER TABLE "branch" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
