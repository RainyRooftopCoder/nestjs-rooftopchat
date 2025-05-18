import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const hashedPswd = await bcrypt.hash(userDto.password, 10);

    const userEntity = this.userRepository.create({
      ...userDto,
      password: hashedPswd,
      regDate: new Date(),
      modiDate: new Date(),
    });

    return this.userRepository.save(userEntity);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();

    return plainToInstance(ResponseUserDto, users);
  }

  async findUser(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
