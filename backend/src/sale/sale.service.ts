import { productSchema, Sale } from '@lib/db';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { z } from 'zod/v4';

@Injectable()
export class SaleService {
  constructor(
    @Inject(Sale.name)
    private readonly saleModel: ReturnModelType<typeof Sale>,
  ) {}

  async createSale(userId: string, products: z.infer<typeof productSchema>[]) {
    const totalPrice = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );

    return await this.saleModel.create({ userId, products, totalPrice });
  }

  async getSaleByUserId(userId: string) {
    return await this.saleModel.find({ userId });
  }
}
