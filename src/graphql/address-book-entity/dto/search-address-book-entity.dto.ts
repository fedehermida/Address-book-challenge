import { ArgsType, Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { AddressBookEntityInput } from './address-book-entity-input.dto';

@ArgsType()
@InputType()
export class SearchAddressBookEntity extends PartialType(
  AddressBookEntityInput,
) {
  @Field(() => Int)
  id: number;
}
