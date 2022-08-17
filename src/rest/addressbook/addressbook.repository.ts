import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressBook, Prisma } from '@prisma/client';
import { AddressBookModel } from './models/addressbook.model';
import { Pagination } from '../interfaces/pagination';

@Injectable()
export class AddressbookRepository {
  constructor(private prisma: PrismaService) {}

  async getAddressBook(id: number): Promise<AddressBook | null> {
    try {
      return await this.prisma.addressBook.findFirst({
        where: { id, active: true },
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }

  async getAllAddressBook(
    skip?: number,
    take?: number,
  ): Promise<Pagination<AddressBook[]>> {
    try {
      const totalAddressBookPromise = this.prisma.addressBook.count({
        where: { active: true },
      });
      const addressBookResultPromise = this.prisma.addressBook.findMany({
        skip,
        take,
        where: { active: true },
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
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }

  async createAddressBook(
    addressBook: Prisma.AddressBookCreateInput,
  ): Promise<AddressBook> {
    try {
      return await this.prisma.addressBook.create({
        data: addressBook,
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }

  async updateAddressBook(
    id: number,
    addressBook: AddressBookModel,
  ): Promise<AddressBook> {
    try {
      return await this.prisma.addressBook.update({
        data: addressBook,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
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
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }
}
