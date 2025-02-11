import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: any): Promise<User> {
    return this.userModel.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('addresses').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate({ path: 'addresses', model: 'Address' })
      .exec();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    console.log(user);
    return user.toObject() as User;
  }

  async update(id: string, data: any): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user.toObject() as User;
  }

  async delete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user.toObject() as User;
  }
}
