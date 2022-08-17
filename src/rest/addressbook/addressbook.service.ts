import { Injectable } from '@nestjs/common';
import { AddressBook } from '@prisma/client';
import { AddressbookRepository } from './addressbook.repository';
import { Pagination } from '../interfaces/pagination';
import { AddressBookModel } from './models/addressbook.model';

@Injectable()
export class AddressbookService {
  constructor(private readonly addressbookRepository: AddressbookRepository) {}

  public async getAddressBook(id: number): Promise<AddressBook | null> {
    return await this.addressbookRepository.getAddressBook(id);
  }

  public async getAllAddressBook(
    skip?: number,
    take?: number,
  ): Promise<Pagination<AddressBook[]>> {
    return await this.addressbookRepository.getAllAddressBook(skip, take);
  }

  public async createAddressBook(
    addressBook: AddressBookModel,
  ): Promise<AddressBook> {
    return await this.addressbookRepository.createAddressBook(addressBook);
  }

  public async updateAddressBook(
    id: number,
    addressBook: AddressBookModel,
  ): Promise<AddressBook | null> {
    return await this.addressbookRepository.updateAddressBook(id, addressBook);
  }

  public async deleteAddressBook(id: number): Promise<AddressBook | null> {
    return await this.addressbookRepository.deleteAddressBook(id);
  }
}
