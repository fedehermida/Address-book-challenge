import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AddressBookService } from './address-book.service';
import { AddressBookObject } from './models/address-book.model';
import { AddressBookEntityService } from '../address-book-entity/address-book-entity.service';
import { AddressBookEntityObject } from '../address-book-entity/models/address-book-entity.model';
import { SearchAddressBookDto } from './dto/search-address-book.dto';
import { AddressBookInput } from './dto/address-book-input.dto';
import { PaginatedAddressBookObject } from './models/paginated-address-book.model';
import { PaginatedAddressBookEntityObject } from '../address-book-entity/models/paginated-address-book-entity.model';
import { PaginationArgs } from '../pagination/pagination-args';

@Resolver((of) => AddressBookObject)
export class AddressBookResolver {
  constructor(
    private addressBookService: AddressBookService,
    private addressBookEntityService: AddressBookEntityService,
  ) {}

  @Query((returns) => AddressBookObject)
  async getAddressBookById(@Args('id', { type: () => Int }) id: number) {
    return await this.addressBookService.findOneById(id);
  }

  @ResolveField(() => PaginatedAddressBookEntityObject)
  async addressBookEntities(
    @Parent() addressBook: AddressBookObject,
    @Args() pagination: PaginationArgs,
  ) {
    const { id } = addressBook;
    return await this.addressBookEntityService.findAllAddressBookEntities(
      id,
      pagination.limit,
      pagination.offset,
    );
  }

  @Query((returns) => PaginatedAddressBookObject)
  async searchAddressBook(
    @Args() searchAddressBookDto: SearchAddressBookDto,
    @Args() pagination: PaginationArgs,
  ) {
    return await this.addressBookService.findMany(
      searchAddressBookDto,
      pagination.offset,
      pagination.limit,
    );
  }

  @Mutation((returns) => AddressBookObject)
  async createAddressBook(@Args('input') input: AddressBookInput) {
    return await this.addressBookService.createAddressBook(input);
  }

  @Mutation((returns) => AddressBookObject)
  async updateAddressBook(
    @Args('id') id: number,
    @Args('input') input: AddressBookInput,
  ) {
    return await this.addressBookService.updateAddressBook(id, input);
  }

  @Mutation((returns) => AddressBookObject)
  async deleteAddressBook(@Args('id') id: number) {
    return await this.addressBookService.deleteAddressBook(id);
  }
}
