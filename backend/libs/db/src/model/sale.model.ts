import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

export class Product {
  @ApiProperty()
  @prop({ required: true })
  productId: string;

  @ApiProperty()
  @prop({ required: true })
  name: string;

  @ApiProperty()
  @prop({ required: true })
  price: number;

  @ApiProperty()
  @prop({ required: true })
  quantity: number;
}

@modelOptions({})
export class Sale {
  @prop({
    required: true,
    ref: () => User,
  })
  userId: Ref<User>;

  @prop({ required: true, type: () => [Product], _id: false })
  products: Product[];

  @prop({ required: true })
  totalPrice: number;

  @prop({ default: () => new Date() })
  saleDate: Date;
}
