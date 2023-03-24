import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async validateUser(username: string, password: string) {
    console.log('Inside validateUser');

    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log('User validation success!');
        return userDB;
      } else {
        console.log('Password does not match');
        return null;
      }
    }
    console.log('User validation failed!');
    return null;
  }
}
