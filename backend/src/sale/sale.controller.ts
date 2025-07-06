import { User } from '@lib/db';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth';
import { CurrentUser } from 'src/user';
import { CreateSaleDto } from './sale.dto';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  createSale(@Body() dto: CreateSaleDto, @CurrentUser() user: User) {
    return this.saleService.createSale(user.id, dto.products);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':userId')
  getSaleById(@Param('userId') userId: string, @CurrentUser() user: User) {
    if (user.username !== 'zy1p' && user.id !== userId)
      throw new UnauthorizedException();

    return this.saleService.getSaleByUserId(userId);
  }
}
