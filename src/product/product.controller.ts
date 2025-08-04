import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDTO } from "./dto/CreateProduct.dto";
import { ProductEntity } from "./product.entity";
import { v4 as uuid } from "uuid";

@Controller("/products")
export class ProductController {
	constructor(private productRepository: ProductRepository) {}

	@Get()
	async getAllProducts() {
		return await this.productRepository.list();
	}

	@Post()
	async createProduct(@Body() productData: CreateProductDTO) {
		const productEntity = new ProductEntity();
		productEntity.id = uuid();
		productEntity.name = productData.name;
		productEntity.price = productData.price;
		productEntity.createdAt = new Date();
		productEntity.updatedAt = null;
		productEntity.deletedAt = null;

		await this.productRepository.create(productEntity);
		return {
			product: productEntity,
			message: "Produto criado com sucesso",
		};
	}
}
