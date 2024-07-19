/*
  Warnings:

  - You are about to drop the column `image_url` on the `branch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "branch" DROP COLUMN "image_url",
ADD COLUMN     "logo_filename" VARCHAR;
