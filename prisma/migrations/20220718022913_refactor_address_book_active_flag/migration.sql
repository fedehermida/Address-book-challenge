/*
  Warnings:

  - Added the required column `active` to the `AddressBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddressBook" ADD COLUMN     "active" BOOLEAN NOT NULL;
