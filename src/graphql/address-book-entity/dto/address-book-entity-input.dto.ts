import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsInt, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class AddressBookEntityInput {
  @Field()
  @IsString()
  readonly address: string;

  @Field()
  @IsString()
  readonly firstName: string;

  @Field()
  @IsString()
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

  @Field((type) => Int)
  @IsInt()
  readonly addressBookId: number;
}
