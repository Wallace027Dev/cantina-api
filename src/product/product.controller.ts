import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";

@Controller("/products")
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Get()
  async getAllProducts() {
    return await this.productRepository.list();
  }

  @Post()
  async createProduct(@Body() product: { name: string; price: number }) {
    return await this.productRepository.create(product);
  }
}
