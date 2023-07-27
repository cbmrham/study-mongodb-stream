import { Injectable } from '@nestjs/common';
import { UserService } from '@study-mongodb-stream/data-access-users';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  async getData() {
    const users = this.userService.users({}).then((users) => users);
    console.log(users);
    return users;
  }
}
