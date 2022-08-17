/*
  Warnings:

  - You are about to drop the column `name` on the `AddressBook` table. All the data in the column will be lost.
  - Added the required column `userName` to the `AddressBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddressBook" DROP COLUMN "name",
ADD COLUMN     "userName" TEXT NOT NULL;
