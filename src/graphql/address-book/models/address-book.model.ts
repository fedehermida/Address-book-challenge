import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginatedAddressBookEntityObject } from '../../address-book-entity/models/paginated-address-book-entity.model';

@ObjectType()
export class AddressBookObject {
  @Field((type) => Int)
  id: number;

  @Field()
  userName?: string;

  @Field()
  active?: boolean;

  @Field((type) => PaginatedAddressBookEntityObject, { nullable: true })
  addressBookEntities: PaginatedAddressBookEntityObject;
}
