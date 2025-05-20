import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findUser(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('사용자가 없습니다.');
    }
    // const hashedPswd = await bcrypt.hash(loginDto.password, 10);
    // console.log(hashedPswd);
    // console.log(user.password);

    const isCompare = await bcrypt.compare(loginDto.password, user.password);
    console.log(isCompare);

    if (!isCompare) {
      throw new UnauthorizedException(
        '아디디 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    /* JWT 작업 */
    const payload = {
      email: user.email,
      nickname: user.nickname,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    // .sign() 대신 .signAsync()를 쓰면 Promise로 동작해 await 사용 가능

    console.log(accessToken);

    return {
      accessToken: accessToken,
      user: payload,
      // 로그인 직후 사용자 정보 사용가능하게 정보 넘겨줌줌
    };
  }
}
