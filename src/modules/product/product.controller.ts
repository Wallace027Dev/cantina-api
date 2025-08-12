import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/CreateProduct.dto";
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("/products")
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllProducts() {
		return await this.productService.getAllProducts();
	}

	@Post()
	async createProduct(@Body() productData: CreateProductDTO) {
		const newProduct = await this.productService.createProduct(productData);

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

		return {
			product: productEntity,
			message: "Produto atualizado com sucesso",
		};
	}
}
