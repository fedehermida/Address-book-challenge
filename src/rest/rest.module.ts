import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';
import { AddressbookModule } from './addressbook/addressbook.module';
import { AddressentityModule } from './addressentity/addressentity.module';

@Module({
  providers: [RestService],
  imports: [AddressbookModule, AddressentityModule],
  controllers: [RestController],
})
export class RestModule {}
