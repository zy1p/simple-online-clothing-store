import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User extends TimeStamps {
  @prop({
    required: true,
    unique: true,
  })
  username: string;

  @prop({
    required: true,
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
