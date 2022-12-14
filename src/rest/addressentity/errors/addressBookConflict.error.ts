import { HttpException, HttpStatus } from '@nestjs/common';

export class AddressBookConflict extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
