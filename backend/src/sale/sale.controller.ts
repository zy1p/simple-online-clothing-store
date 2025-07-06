import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSaleDto } from './sale.dto';
import { SaleService } from './sale.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  createSale(@Body() dto: CreateSaleDto, userId: string) {
    return this.saleService.createSale(userId, dto.products);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':userId')
  getSaleById(@Param('userId') userId: string) {
    return this.saleService.getSaleByUserId(userId);
  }
}
