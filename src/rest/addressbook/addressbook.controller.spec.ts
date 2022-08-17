import { Test, TestingModule } from '@nestjs/testing';
import { AddressbookController } from './addressbook.controller';
import { AddressbookService } from './addressbook.service';
import { GetAddressBooksDto } from './dto/request/getAddressBooks.dto';
import { GetAddressBookDto } from './dto/request/getAddressBook.dto';
import { AddressBookNotFound } from './errors/addressBookNotFound.error';
import { CreateAddressBookDto } from './dto/request/createAddressBook.dto';
import { UpdateAddressBookDto } from './dto/request/updateAddressBook.dto';
import { DeleteAddressBookDto } from './dto/request/deleteAddressBook.dto';

describe('AddressBookController', () => {
  let controller: AddressbookController;
  let service: AddressbookService;
  const mockService = {
    getAllAddressBook: () => '',
    getAddressBook: () => '',
    createAddressBook: () => '',
    updateAddressBook: () => '',
    deleteAddressBook: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressbookController],
      providers: [AddressbookService],
    })
      .overrideProvider(AddressbookService)
      .useValue(mockService)
      .compile();

    controller = module.get<AddressbookController>(AddressbookController);
    service = module.get<AddressbookService>(AddressbookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAddressBooks', () => {
    it('Should return address books paginated', async () => {
      const getAddressBooksDTO: GetAddressBooksDto = { skip: 0, take: 10 };
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
      jest
        .spyOn(service, 'getAllAddressBook')
        .mockResolvedValue(paginatedResult);

      expect(await controller.getAddressBooks(getAddressBooksDTO)).toBe(
        paginatedResult,
      );
    });
  });

  describe('getAddressBook', () => {
    it('Should return address book', async () => {
      const getAddressBooksDTO: GetAddressBookDto = { id: 2 };
      const result = {
        id: 2,
        userName: 'Perez',
        active: true,
      };
      const getAddressBook = jest
        .spyOn(service, 'getAddressBook')
        .mockResolvedValue(result);

      expect(await controller.getAddressBook(getAddressBooksDTO)).toBe(result);

      getAddressBook.mockRestore();
    });
    it('Empty AddressBook response should return NotFoundException', async () => {
      const getAddressBookDTO: GetAddressBookDto = { id: 2 };

      const getAddressBook = jest.spyOn(service, 'getAddressBook');

      await expect(
        controller.getAddressBook(getAddressBookDTO),
      ).rejects.toThrow(AddressBookNotFound);

      getAddressBook.mockRestore();
    });
  });
  describe('createAddressBook', () => {
    it('Should return created address book', async () => {
      const createAddressBookDTO: CreateAddressBookDto = {
        userName: 'challenge',
      };
      const result = {
        id: 1,
        userName: 'challenge',
        active: true,
      };
      const createAddressBook = jest
        .spyOn(service, 'createAddressBook')
        .mockResolvedValue(result);

      expect(await controller.createAddressBook(createAddressBookDTO)).toBe(
        result,
      );

      createAddressBook.mockRestore();
    });
  });

  describe('updateAddressBook', () => {
    it('Should return updated address book', async () => {
      const updateAddressBookDTO: UpdateAddressBookDto = {
        id: 1,
        userName: 'challenge updated',
      };
      const result = {
        id: 1,
        userName: 'challenge updated',
        active: true,
      };
      const updateAddressBook = jest
        .spyOn(service, 'updateAddressBook')
        .mockResolvedValue(result);

      expect(await controller.updateAddressBook(updateAddressBookDTO)).toBe(
        result,
      );

      updateAddressBook.mockRestore();
    });
    it('Empty AddressBook response should return NotFoundException', async () => {
      const updateAddressBookDTO: UpdateAddressBookDto = {
        id: 1,
        userName: 'challenge updated',
      };
      const result = undefined;
      const updateAddressBook = jest
        .spyOn(service, 'updateAddressBook')
        .mockResolvedValue(result);

      await expect(
        controller.updateAddressBook(updateAddressBookDTO),
      ).rejects.toThrow(AddressBookNotFound);

      updateAddressBook.mockRestore();
    });
  });
  describe('deleteAddressBook', () => {
    it('Should return deleted address book', async () => {
      const deleteAddressBookDTO: DeleteAddressBookDto = {
        id: 1,
      };
      const result = {
        id: 1,
        userName: 'challenge deleted',
        active: false,
      };
      const deleteAddressBook = jest
        .spyOn(service, 'deleteAddressBook')
        .mockResolvedValue(result);

      expect(await controller.deleteAddressBook(deleteAddressBookDTO)).toBe(
        result,
      );

      deleteAddressBook.mockRestore();
    });
    it('Empty AddressBook response should return NotFoundException', async () => {
      const deleteAddressBookDTO: DeleteAddressBookDto = {
        id: 1,
      };
      const result = undefined;
      const deleteAddressBook = jest
        .spyOn(service, 'deleteAddressBook')
        .mockResolvedValue(result);

      await expect(
        controller.deleteAddressBook(deleteAddressBookDTO),
      ).rejects.toThrow(AddressBookNotFound);

      deleteAddressBook.mockRestore();
    });
  });
});
