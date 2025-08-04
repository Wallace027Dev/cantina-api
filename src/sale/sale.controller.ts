import { Body, Controller, Get, Post } from "@nestjs/common";
import { SaleRepository } from "./sale.repository";

@Controller("/sales")
export class SaleController {
  constructor(private saleRepository: SaleRepository) {}

  @Get()
  async getAllSales() {
    return await this.saleRepository.list();
  }

  @Post()
  async createSale(@Body() sale: { userId: string; dailyProductId: string }) {
    return await this.saleRepository.save(sale);
  }
}
