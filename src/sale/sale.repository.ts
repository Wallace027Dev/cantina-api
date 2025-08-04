import { Injectable } from "@nestjs/common";

@Injectable()
export class SaleRepository {
  private sales: { userId: string; dailyProductId: string }[] = [];

  async list() {
    return this.sales;
  }

  async save(sale: { userId: string; dailyProductId: string }) {
    this.sales.push(sale);
    console.log(this.sales);
    return sale;
  }
}
