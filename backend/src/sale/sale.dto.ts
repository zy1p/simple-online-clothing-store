import { ApiProperty } from '@nestjs/swagger';

class Product {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}

export class CreateSaleDto {
  @ApiProperty({ type: [Product] })
  products: Product[];
}
