import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, AddressBookEntries } from '@prisma/client';
import { Pagination } from '../interfaces/pagination';
import { AddressBookEntityModel } from './models/addressbookentity.model';

@Injectable()
export class AddressbookEntityRepository {
  constructor(private prisma: PrismaService) {}

  async getAddressBookEntity(
    id: number,
    addressBookId: number,
  ): Promise<AddressBookEntries | null> {
    try {
      return await this.prisma.addressBookEntries.findFirstOrThrow({
        where: { id, addressBookId },
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }

  async getAllAddressBookEntities(
    addressBookId: number,
    skip?: number,
    take?: number,
  ): Promise<Pagination<AddressBookEntries[]>> {
    try {
      const totalAddressBookPromise = this.prisma.addressBookEntries.count({
        where: { addressBookId },
      });
      const addressBookResultPromise = this.prisma.addressBookEntries.findMany({
        skip,
        take,
        where: { addressBookId },
        orderBy: { id: 'asc' },
      });

      const [totalAddressBook, addressBookResult] = await Promise.all([
        totalAddressBookPromise,
        addressBookResultPromise,
      ]);

      const addressBookPagination: Pagination<AddressBookEntries[]> = {
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
    addressBook: AddressBookEntityModel,
  ): Promise<AddressBookEntries> {
    try {
      return await this.prisma.addressBookEntries.create({
        data: addressBook,
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }
  async updateAddressBook(
    id: number,
    addressBook: Prisma.AddressBookEntriesUpdateInput,
  ): Promise<AddressBookEntries> {
    try {
      return await this.prisma.addressBookEntries.update({
        data: addressBook,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }

  async deleteAddressBook(id: number): Promise<AddressBookEntries> {
    try {
      return this.prisma.addressBookEntries.delete({
        where: { id },
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }

  async userHasEmailContact(
    addressBookId: number,
    email: string,
  ): Promise<AddressBookEntries> {
    try {
      return await this.prisma.addressBookEntries.findFirst({
        where: { addressBookId, email },
      });
    } catch (error) {
      throw new ServiceUnavailableException(`Database error: ${error.message}`);
    }
  }
}
