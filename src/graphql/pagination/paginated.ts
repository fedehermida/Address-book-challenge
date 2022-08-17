import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function PaginateResult<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType])
    data: T[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    skip: number;

    @Field(() => Int)
    take: number;
  }

  return PageClass;
}
