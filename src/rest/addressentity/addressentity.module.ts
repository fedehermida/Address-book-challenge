import { Module } from '@nestjs/common';
import { AddressEntityController } from './addressentity.controller';
import { AddressBookEntityService } from './addressbookentity.service';
import { AddressbookService } from '../addressbook/addressbook.service';
import { AddressbookModule } from '../addressbook/addressbook.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { AddressbookEntityRepository } from './addressbookentity.repository';

@Module({
  imports: [AddressbookModule, PrismaModule],
  controllers: [AddressEntityController],
  providers: [
    AddressBookEntityService,
    AddressbookService,
    AddressbookEntityRepository,
  ],
})
export class AddressentityModule {}
