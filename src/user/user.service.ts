import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    username: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const createdUser = new this.userModel({
      username,
      password: hashedPassword,
    });
    return await createdUser.save();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  // TEMPORARY FOR TESTING
  async findAll() {
    return await this.userModel.find().exec();
  }
}
