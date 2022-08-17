import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetAddressBookEntityDto {
  @ApiProperty({
    description: 'The address book entity id unique identifier',
  })
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: 'The address book id unique identifier',
  })
  @IsInt()
  @Type(() => Number)
  addressBookId: number;
}
