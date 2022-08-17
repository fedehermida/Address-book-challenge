import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from './../../pagination/paginated';
import { AddressBookEntityObject } from './address-book-entity.model';

@ObjectType()
export class PaginatedAddressBookEntityObject extends PaginateResult(
  AddressBookEntityObject,
) {}
