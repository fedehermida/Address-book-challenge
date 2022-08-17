import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAddressBookDto {
  @ApiProperty({
    description: 'The userName of the user',
  })
  @IsString()
  userName: string;
}
