/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { DailyProductEntity } from "./daily-product.entity";

@Injectable()
export class DailyProductRepository {
	private dailyProducts: DailyProductEntity[] = [];

	async list() {
		return this.dailyProducts;
	}

	async create(product: DailyProductEntity) {
		this.dailyProducts.push(product);
		console.log(this.dailyProducts);
		return product;
	}
}
