import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AddressBook, AddressBookEntries } from '@prisma/client';
import { Pagination } from 'src/rest/interfaces/pagination';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressBookInput } from './dto/address-book-input.dto';
import { SearchAddressBookDto } from './dto/search-address-book.dto';

@Injectable()
export class AddressBookService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: number): Promise<AddressBook | null> {
    try {
      return await this.prisma.addressBook.findFirst({
        where: { id },
      });
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }

  async findMany(
    searchAddressBook: SearchAddressBookDto,
    skip: number,
    take: number,
  ) {
    try {
      const { userName, active } = searchAddressBook;

      const totalAddressBookPromise = this.prisma.addressBook.count({
        where: {
          userName,
          active,
        },
      });

      const addressBookResultPromise = this.prisma.addressBook.findMany({
        where: { userName, active },
        skip,
        take,
        orderBy: { id: 'asc' },
      });

      const [totalAddressBook, addressBookResult] = await Promise.all([
        totalAddressBookPromise,
        addressBookResultPromise,
      ]);

      const addressBookPagination: Pagination<AddressBook[]> = {
        data: addressBookResult,
        skip,
        take,
        total: totalAddressBook,
      };

      return addressBookPagination;
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }

  async deleteAddressBook(id: number): Promise<AddressBook> {
    try {
      const [deletedAddressBook, deletedAddressBookEntities] =
        await this.prisma.$transaction([
          this.prisma.addressBook.update({
            where: { id },
            data: { active: false },
          }),
          this.prisma.addressBookEntries.deleteMany({
            where: {
              addressBookId: id,
            },
          }),
        ]);

      return deletedAddressBook;
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }
  async updateAddressBook(
    id: number,
    addressBook: AddressBookInput,
  ): Promise<AddressBook> {
    return await this.prisma.addressBook.update({
      data: addressBook,
      where: {
        id,
      },
    });
  }

  async createAddressBook(addressBook: AddressBookInput): Promise<AddressBook> {
    try {
      const { userName, addressBookEntities } = addressBook;
      if (addressBook.addressBookEntities) {
        return await this.createAddressBookWithEntities(addressBook);
      }
      return await this.prisma.addressBook.create({ data: { userName } });
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }

  async createAddressBookWithEntities(
    addressBook: AddressBookInput,
  ): Promise<AddressBook> {
    try {
      const { userName, addressBookEntities } = addressBook;
      return await this.prisma.addressBook.create({
        data: {
          userName,
          addressBookEntries: {
            createMany: {
              data: addressBookEntities,
            },
          },
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }
}
