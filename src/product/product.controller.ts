import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDTO } from "./dto/CreateProduct.dto";
import { ProductEntity } from "./product.entity";
import { v4 as uuid } from "uuid";
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";

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
		productEntity.dailyProducts = [];
		productEntity.createdAt = new Date();
		productEntity.updatedAt = null;
		productEntity.deletedAt = null;

		await this.productRepository.save(productEntity);
		return {
			product: productEntity,
			message: "Produto criado com sucesso",
		};
	}

	@Put("/:id")
	async updateProduct(
		@Param("id") id: string,
		@Body() productData: UpdateProductDTO,
	) {
		const productEntity = await this.productRepository.update(id, productData);
		return {
			product: productEntity,
			message: "Produto atualizado com sucesso",
		};
	}
}
