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
		return product;
	}

	async update(id: string, dataForUpdate: Partial<DailyProductEntity>) {
		const index = this.dailyProducts.findIndex((product) => product.id === id);

		if (index === -1) throw new Error("Produto não encontrado.");

		// Atualiza em memória
		const updatedProduct: DailyProductEntity = {
			...this.dailyProducts[index],
			id: this.dailyProducts[index].id,
			updatedAt: new Date(),
			productId: dataForUpdate.productId ?? this.dailyProducts[index].productId,
			quantity: dataForUpdate.quantity ?? this.dailyProducts[index].quantity,
			sales: dataForUpdate.sales ?? this.dailyProducts[index].sales,
			createdAt: this.dailyProducts[index].createdAt,
			deletedAt: dataForUpdate.deletedAt ?? this.dailyProducts[index].deletedAt,
		};

		this.dailyProducts[index] = updatedProduct;

		return updatedProduct;
	}
}
