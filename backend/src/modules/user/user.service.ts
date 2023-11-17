import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignInRequest } from '../auth/dto/auth.request';
import { User } from './schemas/user.schema';
import { validateObjectId } from '../../common/utils/validate_id';
import { StatusCode } from '../../common/constant/response.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UpdatePasswordRequest } from "./dto/user.request";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: SignInRequest): Promise<User> {
    return await this.userRepository.createUser(user as User);
  }

  async getUserById(id: string): Promise<User> {
    validateObjectId(id);
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new HttpException('User not found', StatusCode.NOT_FOUND);
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.getUserByUsername(username);
  }

  async updateUserById(user: User, id: string): Promise<boolean> {
    const result = await this.userRepository.updateUserById(user, id);

    if (result) {
      return true;
    }
    return false;
  }

  async updatePasswordById(id: string, data: UpdatePasswordRequest): Promise<any> {
    const user = await this.userModel.findById(id);
    console.log(data)
    if (!user) {
      throw new HttpException('User not found', StatusCode.NOT_FOUND);
    }
    const isValidPassword = await bcrypt.compare(
      data.oldPassword,
      user.password,
    );
    if(!isValidPassword) {
      throw new HttpException('Old password is incorrect', StatusCode.BAD_REQUEST);
    }
    user.password = await bcrypt.hash(data.newPassword, 7);
    user.save();
  }
}
