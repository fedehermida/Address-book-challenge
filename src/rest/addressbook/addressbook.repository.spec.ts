import { Test, TestingModule } from '@nestjs/testing';
import { AddressbookController } from './addressbook.controller';
import { AddressbookService } from './addressbook.service';
import { PrismaModule } from '../..//prisma/prisma.module';
import { GetAddressBooksDto } from './dto/request/getAddressBooks.dto';
import { Pagination } from '../../../dist/rest/interfaces/pagination';
import {
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { GetAddressBookDto } from './dto/request/getAddressBook.dto';
import { AddressBookNotFound } from './errors/addressBookNotFound.error';
import { CreateAddressBookDto } from './dto/request/createAddressBook.dto';
import { UpdateAddressBookDto } from './dto/request/updateAddressBook.dto';
import { DeleteAddressBookDto } from './dto/request/deleteAddressBook.dto';
import { AddressbookRepository } from './addressbook.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressBookEntries } from '@prisma/client';

describe('AddressBookRepository', () => {
  let repository: AddressbookRepository;
  let prisma: PrismaService;
  const mockPrisma = {
    addressBook: {
      findFirst: () => '',
      count: () => '',
      findMany: () => '',
      create: () => '',
      update: () => '',
    },
    addressBookEntries: {
      deleteMany: () => '',
    },
    $transaction: ([]) => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressbookRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    repository = module.get<AddressbookRepository>(AddressbookRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getAllAddressBooks', () => {
    it('Should return address books paginated', async () => {
      const input = { skip: 0, take: 10 };
      const paginatedResult = {
        data: [
          {
            id: 2,
            userName: 'Perez',
            active: true,
          },
        ],
        skip: 0,
        take: 10,
        total: 13,
      };

      const totalAddressBook = jest
        .spyOn(prisma.addressBook, 'count')
        .mockResolvedValue(13);

      const addressBookResult = jest
        .spyOn(prisma.addressBook, 'findMany')
        .mockResolvedValue(paginatedResult.data);

      await expect(
        repository.getAllAddressBook(input.skip, input.take),
      ).resolves.toStrictEqual(paginatedResult);

      totalAddressBook.mockRestore();
      addressBookResult.mockRestore();
    });
  });

  describe('deleteAddressBook', () => {
    it('Should return deleted address book', async () => {
      const input = {
        id: 1,
      };
      const result = {
        id: 1,
        userName: 'challenge deleted',
        active: false,
      };

      const batchPayloadResult = {
        count: 1,
      };

      const deletedAddressBookEntities = jest
        .spyOn(prisma.addressBookEntries, 'deleteMany')
        .mockResolvedValue(batchPayloadResult);

      const deleteAddressBook = jest
        .spyOn(prisma.addressBook, 'update')
        .mockResolvedValue(result);

      const deleteAddressBookResult = jest
        .spyOn(prisma, '$transaction')
        .mockResolvedValue([result, batchPayloadResult]);

      expect(await repository.deleteAddressBook(input.id)).toBe(result);

      deleteAddressBook.mockRestore();
      deletedAddressBookEntities.mockRestore();
      deleteAddressBookResult.mockRestore();
    });
  });
  it('Deletion failure should throw ServiceUnavailable', async () => {
    const input = {
      id: 1,
    };
    const result = {
      id: 1,
      userName: 'challenge deleted',
      active: false,
    };

    const batchPayloadResult = {
      count: 0,
    };

    const deletedAddressBookEntities = jest
      .spyOn(prisma.addressBookEntries, 'deleteMany')
      .mockResolvedValue(batchPayloadResult);

    const deleteAddressBook = jest
      .spyOn(prisma.addressBook, 'update')
      .mockResolvedValue(result);

    const deleteAddressBookResult = jest
      .spyOn(prisma, '$transaction')
      .mockRejectedValue(ServiceUnavailableException);

    await expect(repository.deleteAddressBook(input.id)).rejects.toThrow(
      ServiceUnavailableException,
    );

    deleteAddressBook.mockRestore();
    deletedAddressBookEntities.mockRestore();
    deleteAddressBookResult.mockRestore();
  });
});
