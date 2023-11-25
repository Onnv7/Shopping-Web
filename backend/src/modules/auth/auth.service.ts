import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest, SignInRequest } from './dto/auth.request';

import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

import { StatusCode } from '../../common/constant/response.constant';

import { LoginResponse, SignInResponse } from './dto/auth.response';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signInUser(user: SignInRequest): Promise<SignInResponse> {
    const { password } = user;
    const hashPassword = await bcrypt.hash(password, 7);

    const existedUser = await this.userService.getUserByUsername(user.username);
    if (existedUser) {
      throw new HttpException(
        `User ${user.username} already exists`,
        StatusCode.CONFLICT,
      );
    }

    const data = await this.userService.createUser({
      ...user,
      password: hashPassword,
    } as User);

    const token = this.jwtService.sign({ id: data._id });
    const responseData = {
      token,
      userId: data._id.toString(),
    } as SignInResponse;

    return responseData;
  }

  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    const user = await this.userService.getUserByUsername(loginDto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    const responseData = {
      token,
      userId: user._id.toString(),
    } as LoginResponse;
    return responseData;
  }
}
