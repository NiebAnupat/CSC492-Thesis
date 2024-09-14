/*
  Warnings:

  - You are about to drop the column `hn` on the `appointment` table. All the data in the column will be lost.
  - The primary key for the `patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hn` on the `patient_tag` table. All the data in the column will be lost.
  - You are about to drop the column `hn` on the `treatment` table. All the data in the column will be lost.
  - Added the required column `patient_uid` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_hn_fkey";

-- DropForeignKey
ALTER TABLE "patient_tag" DROP CONSTRAINT "patient_tag_hn_fkey";

-- DropForeignKey
ALTER TABLE "treatment" DROP CONSTRAINT "treatment_hn_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "hn",
ADD COLUMN     "patient_uid" VARCHAR;

-- AlterTable
ALTER TABLE "patient" DROP CONSTRAINT "patient_pkey",
ADD COLUMN     "patient_uid" VARCHAR NOT NULL,
ADD CONSTRAINT "patient_pkey" PRIMARY KEY ("patient_uid");

-- AlterTable
ALTER TABLE "patient_tag" DROP COLUMN "hn",
ADD COLUMN     "patient_uid" VARCHAR;

-- AlterTable
ALTER TABLE "treatment" DROP COLUMN "hn",
ADD COLUMN     "patient_uid" VARCHAR;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_uid_fkey" FOREIGN KEY ("patient_uid") REFERENCES "patient"("patient_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_tag" ADD CONSTRAINT "patient_tag_patient_uid_fkey" FOREIGN KEY ("patient_uid") REFERENCES "patient"("patient_uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_patient_uid_fkey" FOREIGN KEY ("patient_uid") REFERENCES "patient"("patient_uid") ON DELETE NO ACTION ON UPDATE CASCADE;
