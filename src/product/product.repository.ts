import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository {
  private products: { name: string; price: number }[] = [];

  async list() {
    return this.products;
  }

  async create(product: { name: string; price: number }) {
    this.products.push(product);
    console.log(this.products);
    return product;
  }
}
