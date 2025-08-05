import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/product/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
	) {}

	async getAllProducts(): Promise<ProductEntity[]> {
		return await this.productRepository.find();
	}

	async getProductById(id: string): Promise<ProductEntity> {
		const product = await this.productRepository.findOne({ where: { id } });

		if (!product) throw new Error("Product not found.");

		return product;
	}

	async createProduct(product: ProductEntity): Promise<ProductEntity> {
		return await this.productRepository.save(product);
	}

	async updateProduct(id: string, dataForUpdate: Partial<ProductEntity>) {
		await this.productRepository.update(id, dataForUpdate);
	}
}
