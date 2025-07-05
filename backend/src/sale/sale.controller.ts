import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSaleDto } from './sale.dto';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  createSale(@Body() dto: CreateSaleDto, userId: string) {
    return this.saleService.createSale(userId, dto.products);
  }

  @Get(':userId')
  getSaleById(@Param('userId') userId: string) {
    return this.saleService.getSaleByUserId(userId);
  }
}
