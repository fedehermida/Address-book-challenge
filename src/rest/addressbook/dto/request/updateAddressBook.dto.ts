import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { CreateAddressBookDto } from './createAddressBook.dto';

export class UpdateAddressBookDto extends PartialType(CreateAddressBookDto) {
  @ApiProperty({
    description: 'The user id unique identifier',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
