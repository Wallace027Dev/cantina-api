import type { Cache } from "cache-manager";
import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	Post,
	Put,
	UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/CreateProduct.dto";
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";

@Controller("/products")
export class ProductController {
	constructor(
		private productService: ProductService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllProducts() {
		const products = await this.productService.getAllProducts();

		await this.cacheManager.set("products", products);

		return products;
	}

	@Post()
	async createProduct(@Body() productData: CreateProductDTO) {
		const newProduct = await this.productService.createProduct(productData);

		await this.cacheManager.del("products");

		return {
			product: newProduct,
			message: "Produto criado com sucesso",
		};
	}

	@Put("/:id")
	async updateProduct(
		@Param("id") id: string,
		@Body() productData: UpdateProductDTO,
	) {
		const productEntity = await this.productService.updateProduct(
			id,
			productData,
		);

		await this.cacheManager.del("products");

		return {
			product: productEntity,
			message: "Produto atualizado com sucesso",
		};
	}
}
