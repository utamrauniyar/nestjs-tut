import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'sunil',
      password: 'sunil',
    },
    {
      username: 'sujan',
      password: 'sujan',
    },
    {
      username: 'shiv',
      password: 'shiv',
    },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
