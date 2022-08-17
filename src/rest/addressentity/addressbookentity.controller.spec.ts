import { Test, TestingModule } from '@nestjs/testing';
import { AddressBookEntityService } from './addressbookentity.service';
import { AddressEntityController } from './addressentity.controller';
import {
  GetAddressBookEntitiesDto,
  GetAddressBookEntitiesParamDto,
} from './dto/request/getAddressBookEntities.dto';
// import { GetAddressBooksDto } from './dto/request/getAddressBooks.dto';
// import { GetAddressBookDto } from './dto/request/getAddressBook.dto';
// import { AddressBookNotFound } from './errors/addressBookNotFound.error';
// import { CreateAddressBookDto } from './dto/request/createAddressBook.dto';
// import { UpdateAddressBookDto } from './dto/request/updateAddressBook.dto';
// import { DeleteAddressBookDto } from './dto/request/deleteAddressBook.dto';
import { Pagination } from '../../../dist/rest/interfaces/pagination';
import { AddressBookEntries } from '@prisma/client';
import { GetAddressBookEntityDto } from './dto/request/getAddressBookEntity.dto';
import { CreateAddressBookEntityDto } from './dto/request/createAddressBookEntity.dto';
import { UpdateAddressBookEntityDto } from './dto/request/updateAddressBookEntity.dto';
import { DeleteAddressBookEntityDto } from './dto/request/deleteAddressBookEntity.dto';

describe('AddressBookController', () => {
  let controller: AddressEntityController;
  let service: AddressBookEntityService;
  const mockService = {
    findAllAddressBookEntities: () => '',
    findAddressBookEntity: () => '',
    createAddressBookEntity: () => '',
    updateAddressBookEntity: () => '',
    deleteAdressBookEntity: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressEntityController],
      providers: [AddressBookEntityService],
    })
      .overrideProvider(AddressBookEntityService)
      .useValue(mockService)
      .compile();

    controller = module.get<AddressEntityController>(AddressEntityController);
    service = module.get<AddressBookEntityService>(AddressBookEntityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAddressBookEntities', () => {
    it('Should return address book entities paginated', async () => {
      const param: GetAddressBookEntitiesParamDto = { addressBookId: 1 };
      const getAddressBooksDTO: GetAddressBookEntitiesDto = {
        skip: 0,
        take: 10,
      };

      const paginatedResult: Pagination<AddressBookEntries[]> = {
        data: [
          {
            id: 2,
            firstName: 'Fernando',
            lastName: 'test',
            phoneNumber: '+541132042479',
            homeNumber: '+1122482222',
            email: 'fh.fernando@gmail.com',
            address: 'Av. Libertador 1912',
            addressBookId: 1,
            createdAt: new Date(1920, 2, 1),
          },
        ],
        skip: 0,
        take: 10,
        total: 13,
      };
      jest
        .spyOn(service, 'findAllAddressBookEntities')
        .mockResolvedValue(paginatedResult);

      expect(
        await controller.getAddressBookEntities(param, getAddressBooksDTO),
      ).toBe(paginatedResult);
    });
  });

  describe('getAddressBookEntity', () => {
    it('Should return address book', async () => {
      const getAddressBooksparamDTO: GetAddressBookEntityDto = {
        id: 2,
        addressBookId: 1,
      };

      const result: AddressBookEntries = {
        id: 2,
        firstName: 'Fernando',
        lastName: 'test',
        phoneNumber: '+541132042479',
        homeNumber: '+1122482222',
        email: 'fh.fernando@gmail.com',
        address: 'Av. Libertador 1912',
        addressBookId: 1,
        createdAt: new Date(1920, 2, 1),
      };

      const getAddressBook = jest
        .spyOn(service, 'findAddressBookEntity')
        .mockResolvedValue(result);

      expect(
        await controller.getAddressBookEntity(getAddressBooksparamDTO),
      ).toBe(result);

      getAddressBook.mockRestore();
    });
  });
  describe('createAddressBookEntity', () => {
    it('Should return created address book', async () => {
      const param: GetAddressBookEntitiesParamDto = {
        addressBookId: 1,
      };

      const body: CreateAddressBookEntityDto = {
        firstName: 'Fernando',
        lastName: 'test',
        phoneNumber: '+541132042479',
        homeNumber: '+1122482222',
        email: 'fh.fernando@gmail.com',
        address: 'Av. Libertador 1912',
      };

      const result = {
        id: 2,
        firstName: 'Fernando',
        lastName: 'test',
        phoneNumber: '+541132042479',
        homeNumber: '+1122482222',
        email: 'fh.fernando@gmail.com',
        address: 'Av. Libertador 1912',
        addressBookId: 1,
        createdAt: new Date(1920, 2, 1),
      };
      const createAddressBook = jest
        .spyOn(service, 'createAddressBookEntity')
        .mockResolvedValue(result);

      expect(await controller.createAddressBookEntity(param, body)).toBe(
        result,
      );

      createAddressBook.mockRestore();
    });
  });

  describe('updateAddressBookEntity', () => {
    it('Should return updated address book', async () => {
      const param: GetAddressBookEntitiesParamDto = {
        addressBookId: 1,
      };
      const updateAddressBookDTO: UpdateAddressBookEntityDto = {
        id: 1,
        firstName: 'Fernando',
        lastName: 'test',
        phoneNumber: '+541132042479',
        homeNumber: '+1122482222',
        email: 'fh.fernando1@gmail.com',
        address: 'Av. Libertador 1912',
      };
      const result = {
        id: 1,
        firstName: 'Fernando',
        lastName: 'test',
        phoneNumber: '+541132042479',
        homeNumber: '+1122482222',
        email: 'fh.fernando1@gmail.com',
        address: 'Av. Libertador 1912',
        addressBookId: 1,
        createdAt: new Date(1920, 2, 1),
      };
      const updateAddressBook = jest
        .spyOn(service, 'updateAddressBookEntity')
        .mockResolvedValue(result);

      expect(
        await controller.updateAddressBookEntity(param, updateAddressBookDTO),
      ).toBe(result);

      updateAddressBook.mockRestore();
    });

    describe('deleteAddressBookEntity', () => {
      it('Should return deleted address book', async () => {
        const deleteAddressBookDTO: DeleteAddressBookEntityDto = {
          id: 1,
          addressBookId: 2,
        };
        const result = {
          id: 1,
          firstName: 'Fernando',
          lastName: 'test',
          phoneNumber: '+541132042479',
          homeNumber: '+1122482222',
          email: 'fh.fernando1@gmail.com',
          address: 'Av. Libertador 1912',
          addressBookId: 1,
          createdAt: new Date(1920, 2, 1),
        };

        const deleteAddressBook = jest
          .spyOn(service, 'deleteAdressBookEntity')
          .mockResolvedValue(result);

        expect(
          await controller.deleteAddressBookEntity(deleteAddressBookDTO),
        ).toBe(result);

        deleteAddressBook.mockRestore();
      });
    });
  });
});
