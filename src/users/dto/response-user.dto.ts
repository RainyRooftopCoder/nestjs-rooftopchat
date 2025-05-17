import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';

export class ResponseUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @Transform(({ value }) => dayjs(value).format('YYYY/MM/DD HH:mm:ss'))
  regDate: string;

  @IsOptional()
  @Transform(({ value }) => dayjs(value).format('YYYY/MM/DD HH:mm:ss'))
  modiDate: string;

  @IsOptional()
  @Transform(({ value }) => dayjs(value).format('YYYY/MM/DD HH:mm:ss'))
  delDate: string;
}
