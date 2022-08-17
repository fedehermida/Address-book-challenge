import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'src/graphql/pagination/paginated';
import { AddressBookObject } from './address-book.model';

@ObjectType()
export class PaginatedAddressBookObject extends PaginateResult(
  AddressBookObject,
) {}
