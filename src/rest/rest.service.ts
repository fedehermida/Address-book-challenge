import { Injectable } from '@nestjs/common';

@Injectable()
export class RestService {
  getHealth() {
    return 'Rest Service OK';
  }
}
