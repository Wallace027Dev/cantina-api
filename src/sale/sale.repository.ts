/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { SaleEntity } from "./sale.entity";

@Injectable()
export class SaleRepository {
	private sales: SaleEntity[] = [];

	async list() {
		return this.sales;
	}

	async save(sale: SaleEntity) {
		this.sales.push(sale);
		console.log(this.sales);
		return sale;
	}
}
