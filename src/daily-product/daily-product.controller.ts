import { Body, Controller, Get, Post } from "@nestjs/common";
import { DailyProductRepository } from "./daily-product.repository";

@Controller("/daily-products")
export class DailyProductController {
  constructor(private dailyProductRepository: DailyProductRepository) {}

  @Get()
  async getAllProducts() {
    return await this.dailyProductRepository.list();
  }

  @Post()
  async createProduct(@Body() product: { name: string; price: number }) {
    return await this.dailyProductRepository.create(product);
  }
}
