import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User as UserEntity } from 'src/typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  private users: User[] = [
    {
      id: 1,
      username: 'sunil',
      password: 'sunil',
    },
    {
      id: 2,
      username: 'sujan',
      password: 'sujan',
    },
    {
      id: 3,
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

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  /**
   * save user details in postgres DB
   */
  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    console.log(password);

    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  // user find
  findUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  // find user by id
  findUserById(id: number) {
    return this.userRepository.findOneById(id);
  }
}
