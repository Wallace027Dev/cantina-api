/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductRepository {
	private products: ProductEntity[] = [];

	async list() {
		return this.products;
	}

	async findById(id: string) {
		return this.products.find((product) => product.id === id);
	}

	async create(product: ProductEntity) {
		this.products.push(product);
		return product;
	}

	async update(id: string, dataForUpdate: Partial<ProductEntity>) {
		const possibleProduct = await this.findById(id);
		if (!possibleProduct) throw new Error("Produto não encontrado.");

		const updatedProduct = {
			id: possibleProduct.id,
			name: dataForUpdate.name ?? possibleProduct.name,
			price: dataForUpdate.price ?? possibleProduct.price,
			dailyProducts:
				dataForUpdate.dailyProducts ?? possibleProduct.dailyProducts,
			createdAt: possibleProduct.createdAt,
			updatedAt: new Date(),
			deletedAt: null,
		};

		return updatedProduct;
	}

	async delete(id: string) {
		const possibleProduct = await this.findById(id);
		if (!possibleProduct) throw new Error("Produto nao encontrado.");

		this.products = this.products.filter((product) => product.id !== id);

		return id;
	}
}
