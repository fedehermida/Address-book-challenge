import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsInt } from 'class-validator';
import { CreateAddressBookEntityDto } from './createAddressBookEntity.dto';

export class UpdateAddressBookEntityDto extends PartialType(
  CreateAddressBookEntityDto,
) {
  @ApiProperty({
    description: 'The address book entity id unique identifier',
  })
  @IsEmail({ require: true })
  email: string;

  @IsInt()
  @Type(() => Number)
  id: number;
}
