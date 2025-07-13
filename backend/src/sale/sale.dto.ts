import { Product } from '@lib/db';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ type: [Product] })
  products: Product[];
}
