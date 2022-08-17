import { ApiProperty } from '@nestjs/swagger';

export class AddressBookDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  active: boolean;
}
