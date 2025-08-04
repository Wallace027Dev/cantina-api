import { Injectable } from "@nestjs/common";

@Injectable()
export class DailyProductRepository {
  private dailyProducts: { name: string; price: number }[] = [];

  async list() {
    return this.dailyProducts;
  }

  async create(product: { name: string; price: number }) {
    this.dailyProducts.push(product);
    console.log(this.dailyProducts);
    return product;
  }
}
