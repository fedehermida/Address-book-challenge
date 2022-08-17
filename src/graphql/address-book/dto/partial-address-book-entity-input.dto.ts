import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';

@InputType()
export class PartialAddressBookEntityInput {
  @Field()
  readonly address: string;

  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  @Field()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @Field({ nullable: true })
  @IsPhoneNumber()
  readonly homeNumber: string;

  @Field({ nullable: true })
  @IsEmail()
  readonly email: string;
}
