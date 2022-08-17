import { ConflictException, Injectable } from '@nestjs/common';
import { AddressbookService } from '../addressbook/addressbook.service';
import { AddressBookNotFound } from '../addressbook/errors/addressBookNotFound.error';
import { AddressbookEntityRepository } from './addressbookentity.repository';
import { UpdateAddressBookEntityDto } from './dto/request/updateAddressBookEntity.dto';
import { AddressBookConflict } from './errors/addressBookConflict.error';
import { AddressBookEntityNotFound } from './errors/addressBookEntityNotFound.error';
import { AddressBookEntityModel } from './models/addressbookentity.model';
import { AddressBook } from '@prisma/client';

@Injectable()
export class AddressBookEntityService {
  constructor(
    private readonly addressBookEntityRepository: AddressbookEntityRepository,
    private readonly addressBookService: AddressbookService,
  ) {}

  public async findAllAddressBookEntities(
    addressBookId: number,
    take: number,
    skip: number,
  ) {
    return await this.addressBookEntityRepository.getAllAddressBookEntities(
      addressBookId,
      skip,
      take,
    );
  }
  public async findAddressBookEntity(id: number, addressBookId: number) {
    return await this.addressBookEntityRepository.getAddressBookEntity(
      id,
      addressBookId,
    );
  }
  public async createAddressBookEntity(
    addressBookEntity: AddressBookEntityModel,
  ) {
    await this.checkCreateEmailExistence(
      addressBookEntity.addressBookId,
      addressBookEntity.email,
    );
    await this.validateAddressBookId(addressBookEntity.addressBookId);
    return await this.addressBookEntityRepository.createAddressBook(
      addressBookEntity,
    );
  }
  public async updateAddressBookEntity(
    addressBookId: number,
    addressBookEntityUpdate: UpdateAddressBookEntityDto,
  ) {
    await this.validateAddressBookId(addressBookId);
    await this.validateAddressBookEntityId(
      addressBookId,
      addressBookEntityUpdate.id,
    );
    await this.checkUpdateEmailExistence(
      addressBookId,
      addressBookEntityUpdate.email,
    );
    return await this.addressBookEntityRepository.updateAddressBook(
      addressBookEntityUpdate.id,
      addressBookEntityUpdate,
    );
  }
  public async deleteAdressBookEntity(addressBookId: number, id: number) {
    await this.validateAddressBookId(addressBookId);
    await this.validateAddressBookEntityId(id, addressBookId);

    return await this.addressBookEntityRepository.deleteAddressBook(id);
  }

  private async validateAddressBookId(addressBookId: number) {
    const addressBook = await this.addressBookService.getAddressBook(
      addressBookId,
    );
    if (!addressBook)
      throw new AddressBookConflict('Address Book ID Not Found');
    return;
  }

  private async validateAddressBookEntityId(addressBookId: number, id: number) {
    const addressBookEntity =
      await this.addressBookEntityRepository.getAddressBookEntity(
        id,
        addressBookId,
      );
    if (!addressBookEntity)
      throw new AddressBookEntityNotFound('Address Book Entity Not Found');
    return;
  }

  private async checkEmailExistence(addressBookId: number, email: string) {
    return await this.addressBookEntityRepository.userHasEmailContact(
      addressBookId,
      email,
    );
  }

  private async checkCreateEmailExistence(
    addressBookId: number,
    email: string,
  ) {
    const emailExistence = await this.checkEmailExistence(addressBookId, email);

    if (emailExistence) {
      throw new ConflictException(
        `Email ${email} already exists for addressBookId: ${addressBookId}`,
      );
    }
  }

  private async checkUpdateEmailExistence(
    addressBookId: number,
    email: string,
  ) {
    const emailExistence = await this.checkEmailExistence(addressBookId, email);
    if (emailExistence) {
      if (emailExistence.email !== email) {
        throw new ConflictException(
          `Email ${email} already exists for addressBookId: ${addressBookId}`,
        );
      }
    }
    return;
  }
}
