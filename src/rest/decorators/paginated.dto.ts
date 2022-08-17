import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<T> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  skip: number;

  @ApiProperty()
  data: T[];
}
