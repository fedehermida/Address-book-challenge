import { Module } from '@nestjs/common';
import { AddressbookController } from './addressbook.controller';
import { AddressbookRepository } from './addressbook.repository';
import { AddressbookService } from './addressbook.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AddressbookController],
  providers: [AddressbookService, AddressbookRepository],
  imports: [PrismaModule],
  exports: [AddressbookService, AddressbookRepository],
})
export class AddressbookModule {}
