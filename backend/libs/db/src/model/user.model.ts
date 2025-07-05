import { modelOptions, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User extends TimeStamps implements Base {
  _id: Types.ObjectId;

  id: string;

  @prop({
    required: true,
    unique: true,
  })
  username: string;

  @prop({
    required: true,
    select: false, // Exclude password from queries by default
  })
  password: string;

  @prop({
    required: true,
    unique: true,
  })
  email: string;

  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @prop()
  address?: string;

  @prop()
  phoneNumber?: string;
}
