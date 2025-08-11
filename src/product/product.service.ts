import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/product/product.entity";
import { Repository } from "typeorm";
import { CreateProductDTO } from "./dto/CreateProduct.dto";

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
	) {}

	async getAllProducts() {
		return await this.productRepository.find();
	}

	async searchProductById(id: string) {
		const product = await this.productRepository.findOne({ where: { id } });

		if (product === null) {
			throw new NotFoundException("Product not found.");
		}
		return product;
	}

	async productAlreadyExist(name: string) {
		const product = await this.productRepository.findOne({ where: { name } });

		if (product) {
			throw new NotFoundException("Product already exists.");
		}
	}

	async createProduct(data: CreateProductDTO) {
		await this.productAlreadyExist(data.name);

		const productEntity = new ProductEntity();
		productEntity.name = data.name;
		productEntity.price = data.price;
		productEntity.dailyProducts = [];

		return await this.productRepository.save(productEntity);
	}

	async updateProduct(id: string, dataForUpdate: Partial<ProductEntity>) {
		const product = await this.searchProductById(id);

		Object.assign(product, dataForUpdate);

		await this.productRepository.save(product);
	}
}
