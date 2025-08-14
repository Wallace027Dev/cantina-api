import type { Cache } from "cache-manager";
import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	Post,
	Put,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/CreateProduct.dto";
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "src/resources/decorators/roles.decorator";

@Controller("/products")
export class ProductController {
	constructor(
		private productService: ProductService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@UseInterceptors(CacheInterceptor)
	@Get()
	async getAllProducts() {
		const products = await this.productService.getAllProducts();

		await this.cacheManager.set("products", products);

		return { message: "Produtos encontrados com sucesso", products };
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Post()
	async createProduct(@Body() productData: CreateProductDTO) {
		const newProduct = await this.productService.createProduct(productData);

		await this.cacheManager.del("products");

		return {
			message: "Produto criado com sucesso",
			product: newProduct,
		};
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
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
			message: "Produto atualizado com sucesso",
			product: productEntity,
		};
	}
}
