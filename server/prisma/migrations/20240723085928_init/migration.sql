/*
  Warnings:

  - You are about to drop the column `branch_name` on the `branch` table. All the data in the column will be lost.
  - Added the required column `branch_name_en` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_name_th` to the `branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "branch" DROP COLUMN "branch_name",
ADD COLUMN     "branch_name_en" VARCHAR NOT NULL,
ADD COLUMN     "branch_name_th" VARCHAR NOT NULL;
