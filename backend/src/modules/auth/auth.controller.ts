import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginRequest, SignInRequest } from './dto/auth.request';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SwaggerConstant } from '../../common/constant/swagger.constant';

import { Public } from '../../common/decorator/public.decorator';
import { SerializerInterceptor } from '../../common/interceptors/serializer.interceptor';
import { LoginResponse, SignInResponse } from './dto/auth.response';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: SwaggerConstant.AUTH_SIGN_IN_SUM,
    description: SwaggerConstant.AUTH_REGISTER_DESC,
  })
  @UseInterceptors(new SerializerInterceptor(SignInResponse))
  @Public()
  @Post('/register')
  async register(@Body() body: SignInRequest): Promise<any> {
    const data = await this.authService.signInUser(body);
    return data;
  }

  @ApiOperation({
    summary: SwaggerConstant.AUTH_LOGIN_SUM,
    description: SwaggerConstant.AUTH_LOGIN_DESC,
  })
  @UseInterceptors(new SerializerInterceptor(LoginResponse))
  @Public()
  @Post('/login')
  async login(@Body() body: LoginRequest): Promise<{ token: string }> {
    const data = await this.authService.login(body);
    return data;
  }
}
