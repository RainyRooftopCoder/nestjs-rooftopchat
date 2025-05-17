import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();
    const resDto: ResponseUserDto[] = plainToInstance(ResponseUserDto, users);

    return plainToInstance(ResponseUserDto, users);
  }
}
