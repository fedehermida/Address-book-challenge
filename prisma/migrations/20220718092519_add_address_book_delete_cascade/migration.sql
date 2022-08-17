-- DropForeignKey
ALTER TABLE "AddressBookEntries" DROP CONSTRAINT "AddressBookEntries_addressBookId_fkey";

-- AddForeignKey
ALTER TABLE "AddressBookEntries" ADD CONSTRAINT "AddressBookEntries_addressBookId_fkey" FOREIGN KEY ("addressBookId") REFERENCES "AddressBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
