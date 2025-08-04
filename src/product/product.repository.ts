/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductRepository {
	private products: ProductEntity[] = [];

	async list() {
		return this.products;
	}

	async create(product: ProductEntity) {
		this.products.push(product);
		console.log(this.products);
		return product;
	}
}
