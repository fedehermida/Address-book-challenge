import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddressBookEntityObject {
  @Field((type) => Int)
  id: number;

  @Field()
  address: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  homeNumber: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field((type) => Int)
  addressBookId: number;
}
