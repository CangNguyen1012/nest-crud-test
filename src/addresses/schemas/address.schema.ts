import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
