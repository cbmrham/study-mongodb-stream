import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData() {
    return ['hello', 'world'];
  }
}
