import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { PartialAddressBookEntityInput } from './partial-address-book-entity-input.dto';

@InputType()
export class AddressBookInput {
  @Field()
  @IsString()
  readonly userName: string;

  @Field((type) => [PartialAddressBookEntityInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => PartialAddressBookEntityInput, {})
  addressBookEntities: PartialAddressBookEntityInput[];
}
