import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { UserDocument, User as UserModel } from '../schema/user.schema';
import { NOT_FOUND_USER } from '../user.message';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findById(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id }).lean().exec();
    if (!user) {
      throw new NotFoundException(NOT_FOUND_USER);
    }

    return user;
  }
}
