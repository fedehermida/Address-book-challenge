import { IsBoolean } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/graphql/pagination/pagination-args';

@ArgsType()
export class SearchAddressBookDto {
  @Field({ nullable: true })
  userName?: string;

  @Field({ defaultValue: true })
  @IsBoolean()
  active: boolean;
}
