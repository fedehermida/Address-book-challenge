import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Prisma, AddressBookEntries } from '@prisma/client';
import { Pagination } from 'src/rest/interfaces/pagination';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressBookEntityInput } from './dto/address-book-entity-input.dto';
import { SearchAddressBookEntity } from './dto/search-address-book-entity.dto';
import { UpdateAddressBookEntityInput } from './dto/update-address-book-entity-input.dto';
import { PaginatedAddressBookEntityObject } from './models/paginated-address-book-entity.model';

@Injectable()
export class AddressBookEntityService {
  constructor(private prisma: PrismaService) {}

  async findAllAddressBookEntities(
    addressBookId: number,
    skip: number,
    take: number,
  ): Promise<PaginatedAddressBookEntityObject> {
    try {
      const totalAddressBookPromise = this.prisma.addressBookEntries.count({
        where: { addressBookId },
      });

      const addressBookEntriesPromise = this.prisma.addressBookEntries.findMany(
        {
          where: { addressBookId },
          orderBy: { id: 'asc' },
        },
      );

      const [totalAddressBook, addressBookResult] = await Promise.all([
        totalAddressBookPromise,
        addressBookEntriesPromise,
      ]);

      const addressBookEntitiesPagination: PaginatedAddressBookEntityObject = {
        skip,
        take,
        data: addressBookResult,
        total: totalAddressBook,
      };

      return addressBookEntitiesPagination;
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }

  async findMany(
    skip: number,
    take: number,
    searchAddressBookDto: SearchAddressBookEntity,
  ) {
    try {
      const totalAddressBookPromise = this.prisma.addressBookEntries.count({
        where: searchAddressBookDto,
      });
      const addressBookResultPromise = this.prisma.addressBookEntries.findMany({
        skip,
        take,
        where: searchAddressBookDto,
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
      throw new ServiceUnavailableException('Database Error');
    }
  }

  async getAddressBookEntity(id: number): Promise<AddressBookEntries | null> {
    try {
      return await this.prisma.addressBookEntries.findFirst({
        where: { id },
      });
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }

  async createAddressBookEntity(
    addressBook: AddressBookEntityInput,
  ): Promise<AddressBookEntries> {
    try {
      return await this.prisma.addressBookEntries.create({
        data: addressBook,
      });
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }

  async updateAddressBookEntity(
    id: number,
    addressBook: UpdateAddressBookEntityInput,
  ): Promise<AddressBookEntries> {
    try {
      return await this.prisma.addressBookEntries.update({
        data: addressBook,
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }
  async deleteAddressBookEntity(id: number): Promise<AddressBookEntries> {
    try {
      return await this.prisma.addressBookEntries.delete({
        where: { id },
      });
    } catch (error) {
      throw new ServiceUnavailableException('Database Error');
    }
  }
}
