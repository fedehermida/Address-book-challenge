import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetAddressBookDto {
  @ApiProperty({
    description: 'The user id unique identifier',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
