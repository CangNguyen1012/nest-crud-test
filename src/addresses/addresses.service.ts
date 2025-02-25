import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from './schemas/address.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(data: { user: string; [key: string]: any }): Promise<Address> {
    const address = await this.addressModel.create(data);
    await this.userModel.findByIdAndUpdate(data.user, {
      $push: { addresses: address._id },
    });
    return address;
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressModel
      .findById(id)
      .populate('user')
      .exec();
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async update(id: string, data: Partial<Address>): Promise<Address> {
    const address = await this.addressModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async delete(id: string): Promise<Address> {
    const address = await this.addressModel.findByIdAndDelete(id).exec();
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    await this.userModel.findByIdAndUpdate(address.user, {
      $pull: { addresses: id },
    });
    return address;
  }
}
