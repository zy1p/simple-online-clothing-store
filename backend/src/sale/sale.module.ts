import { DbModule, Sale } from '@lib/db';
import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [DbModule.forFeature(Sale)],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
