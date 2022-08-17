import { Module } from '@nestjs/common';
import { AddressBookResolver } from './address-book/address-book.resolver';
import { AddressBookService } from './address-book/address-book.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressBookEntityService } from './address-book-entity/address-book-entity.service';
import { AddressBookEntityResolver } from './address-book-entity/address-book-entity.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    AddressBookResolver,
    AddressBookService,
    AddressBookEntityService,
    AddressBookEntityResolver,
  ],
})
export class GraphqlModule {}
