/*
  Warnings:

  - Added the required column `role` to the `person_information` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('admin', 'dentist', 'counter_staff', 'manager', 'owner', 'developer');

-- AlterTable
ALTER TABLE "person_information" ADD COLUMN     "role" "roles" NOT NULL;

-- CreateTable
CREATE TABLE "developer" (
    "developer_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'developer',

    CONSTRAINT "developer_pkey" PRIMARY KEY ("developer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "developer_email_key" ON "developer"("email");
