import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetAddressBookEntitiesDto {
  @ApiProperty({
    description: 'The offset of the current pagination',
  })
  @IsInt()
  @Type(() => Number)
  skip: number;

  @ApiProperty({
    description: 'The amount of elements from the current pagination',
  })
  @IsInt()
  @Type(() => Number)
  take: number;
}

export class GetAddressBookEntitiesParamDto {
  @IsInt()
  @Type(() => Number)
  addressBookId: number;
}
