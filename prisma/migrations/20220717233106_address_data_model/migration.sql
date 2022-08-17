/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "AddressBook" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AddressBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressBookEntries" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "homeNumber" TEXT,
    "email" TEXT,
    "addressBookId" INTEGER NOT NULL,

    CONSTRAINT "AddressBookEntries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddressBookEntries" ADD CONSTRAINT "AddressBookEntries_addressBookId_fkey" FOREIGN KEY ("addressBookId") REFERENCES "AddressBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
