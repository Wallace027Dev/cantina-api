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
		return sale;
	}

	async update(id: string, dataForUpdate: Partial<SaleEntity>) {
		const index = this.sales.findIndex((sale) => sale.id === id);
		if (index === -1) throw new Error("Venda nao encontrada.");
		this.sales[index] = { ...this.sales[index], ...dataForUpdate };
		return this.sales[index];
	}

	async delete(id: string) {
		const possibleUser = this.sales.find((sale) => sale.id === id);
		if (!possibleUser) throw new Error("Venda nao encontrada.");

		this.sales = this.sales.filter((sale) => sale.id !== id);

		return id;
	}
}
