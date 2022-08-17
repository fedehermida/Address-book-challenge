import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../pagination/pagination-args';
import { AddressBookEntityService } from './address-book-entity.service';
import { AddressBookEntityInput } from './dto/address-book-entity-input.dto';
import { SearchAddressBookEntity } from './dto/search-address-book-entity.dto';
import { UpdateAddressBookEntityInput } from './dto/update-address-book-entity-input.dto';
import { AddressBookEntityObject } from './models/address-book-entity.model';
import { PaginatedAddressBookEntityObject } from './models/paginated-address-book-entity.model';

@Resolver((of) => AddressBookEntityObject)
export class AddressBookEntityResolver {
  constructor(private addressBookEntityService: AddressBookEntityService) {}

  @Query((returns) => AddressBookEntityObject)
  async getAddressBookEntityById(@Args('id', { type: () => Int }) id: number) {
    return await this.addressBookEntityService.getAddressBookEntity(id);
  }

  @Query((returns) => PaginatedAddressBookEntityObject)
  async searchAddressBookEntites(
    @Args('input') searchAddressBook: SearchAddressBookEntity,
    @Args() pagination: PaginationArgs,
  ) {
    return await this.addressBookEntityService.findMany(
      pagination.offset,
      pagination.limit,
      searchAddressBook,
    );
  }

  @Mutation((returns) => AddressBookEntityObject)
  async createAddressBookEntity(@Args('input') input: AddressBookEntityInput) {
    return await this.addressBookEntityService.createAddressBookEntity(input);
  }

  @Mutation((returns) => AddressBookEntityObject)
  async updateAddressBookEntity(
    @Args('id') id: number,
    @Args('input') input: UpdateAddressBookEntityInput,
  ) {
    return await this.addressBookEntityService.updateAddressBookEntity(
      id,
      input,
    );
  }

  @Mutation((returns) => AddressBookEntityObject)
  async deleteAddressBookEntity(@Args('id') id: number) {
    return await this.addressBookEntityService.deleteAddressBookEntity(id);
  }
}
