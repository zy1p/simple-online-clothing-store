import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('sales')
export class SaleController {
  @Post()
  createSale() {
    // Handle create sale
  }

  @Get(':id')
  getSaleById(@Param('id') id: string) {
    // Handle get sale by ID
  }
}
