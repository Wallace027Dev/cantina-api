/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { DailyProductEntity } from "./daily-product.entity";

@Injectable()
export class DailyProductRepository {
	private dailyProducts: DailyProductEntity[] = [];

	async list() {
		return this.dailyProducts;
	}

	async findById(id: string) {
		return this.dailyProducts.find((product) => product.id === id);
	}

	async save(product: DailyProductEntity) {
		this.dailyProducts.push(product);
		return product;
	}

	async update(id: string, dataForUpdate: Partial<DailyProductEntity>) {
		const existingProduct = await this.findById(id);
		if (!existingProduct) throw new Error("Produto não encontrado.");

		const updatedProduct: DailyProductEntity = {
			id: existingProduct.id,
			productId: dataForUpdate.productId ?? existingProduct.productId,
			eventDayId: dataForUpdate.eventDayId ?? existingProduct.eventDayId,
			quantity: dataForUpdate.quantity ?? existingProduct.quantity,
			sales: dataForUpdate.sales ?? existingProduct.sales,
			createdAt: existingProduct.createdAt,
			updatedAt: new Date(),
			deletedAt: dataForUpdate.deletedAt ?? existingProduct.deletedAt,
		};

		return updatedProduct;
	}

	async delete(id: string) {
		const index = await this.findById(id);
		if (!index) throw new Error("Produto nao encontrado.");

		this.dailyProducts = this.dailyProducts.filter(
			(product) => product.id !== id,
		);

		return id;
	}
}
