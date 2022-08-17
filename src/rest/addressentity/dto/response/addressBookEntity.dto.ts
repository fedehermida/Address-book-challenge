import { ApiProperty } from '@nestjs/swagger';

export class AddressBookEntityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  homeNumber?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  addressBookId: number;
}
