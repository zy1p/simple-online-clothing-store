import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './user.model';

@modelOptions({})
export class Sale {
  @prop({
    required: true,
    ref: () => User,
    type: () => String,
    localField: 'userId',
    foreignField: '_id',
  })
  userId: Ref<User>;

  @prop({ required: true })
  products: string;

  @prop({ required: true })
  totalPrice: number;

  @prop({ default: () => new Date() })
  saleDate: Date;
}
