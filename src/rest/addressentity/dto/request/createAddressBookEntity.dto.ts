import { IsOptional, IsPhoneNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAddressBookEntityDto {
  @ApiProperty({
    description: 'The address of the registered user',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'The first name of the registered user',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the registered user',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The phone number of the registered user',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'The home number of the registered user',
  })
  @IsPhoneNumber()
  @IsOptional()
  homeNumber?: string;

  @ApiProperty({
    description: 'The e-mail of the registered user',
  })
  @IsEmail({ require: true })
  email: string;
}
