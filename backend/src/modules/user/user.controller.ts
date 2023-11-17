import {
  Body,
  Controller,
  Param,
  Put,
  Get,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorator/roles.decorator';
import { UpdatePasswordRequest, UpdateUserRequest } from './dto/user.request';
import { Public } from '../../common/decorator/public.decorator';
import { SerializerInterceptor } from '../../common/interceptors/serializer.interceptor';
import { GetUserByIdResponse } from './dto/user.response';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.USER)
  @Put('/:id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateUserRequest): Promise<void> {
    await this.userService.updateUserById(body as User, id);
  }

  // @Roles(Role.USER)
  @UseInterceptors(new SerializerInterceptor(GetUserByIdResponse))
  @Roles(Role.USER)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Roles(Role.USER)
  @Patch('/:userId/password')
  async updatePasswordById(
    @Param('userId') userId: string,
    @Body() body: UpdatePasswordRequest,
  ): Promise<User> {
    return await this.userService.updatePasswordById(userId, body);
  }
}
