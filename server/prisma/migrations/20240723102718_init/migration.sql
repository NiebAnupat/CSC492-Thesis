/*
  Warnings:

  - You are about to drop the column `clinic_name` on the `clinic` table. All the data in the column will be lost.
  - Added the required column `clinic_name_en` to the `clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_name_th` to the `clinic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clinic" DROP COLUMN "clinic_name",
ADD COLUMN     "clinic_name_en" VARCHAR NOT NULL,
ADD COLUMN     "clinic_name_th" VARCHAR NOT NULL;
