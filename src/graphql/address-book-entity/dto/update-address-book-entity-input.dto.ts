import { InputType, PartialType } from '@nestjs/graphql';
import { AddressBookEntityInput } from './address-book-entity-input.dto';

@InputType()
export class UpdateAddressBookEntityInput extends PartialType(
  AddressBookEntityInput,
) {}
