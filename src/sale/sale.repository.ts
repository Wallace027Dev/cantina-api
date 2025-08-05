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

	async findById(id: string) {
		return this.sales.find((sale) => sale.id === id);
	}

	async update(id: string, dataForUpdate: Partial<SaleEntity>) {
		const existingSale = await this.findById(id);
		if (!existingSale) throw new Error("Venda não encontrada.");
		const updatedSale: SaleEntity = {
			id: existingSale.id,
			user: existingSale.user,
			dailyProduct: existingSale.dailyProduct,
			quantitySold: dataForUpdate.quantitySold ?? existingSale.quantitySold,
			createdAt: existingSale.createdAt,
		};

		return updatedSale;
	}

	async delete(id: string) {
		const possibleUser = await this.findById(id);
		if (!possibleUser) throw new Error("Venda nao encontrada.");

		this.sales = this.sales.filter((sale) => sale.id !== id);

		return id;
	}
}
