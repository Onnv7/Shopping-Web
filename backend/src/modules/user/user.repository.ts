import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }
  async getUserByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async updateUserById(user: User, id: string) {
    return await this.userModel.findByIdAndUpdate(
      id,
      { ...user },
      { new: true },
    );
  }

  async updatePasswordById(id: string, password: string): Promise<void> {}
}
