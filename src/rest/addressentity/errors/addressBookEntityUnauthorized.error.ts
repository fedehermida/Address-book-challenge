import { HttpException, HttpStatus } from '@nestjs/common';

export class AddressBookEntityUnauthorized extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
