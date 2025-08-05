import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { DailyProductRepository } from "./daily-product.repository";
import { v4 as uuid } from "uuid";
import { CreateDailyProductDTO } from "./dto/DailyProduct.dto";
import { DailyProductEntity } from "./daily-product.entity";
import { UpdateDailyProductDTO } from "./dto/UpdateDailyProduct.dto";

@Controller("/daily-products")
export class DailyProductController {
	constructor(private dailyProductRepository: DailyProductRepository) {}

	@Get()
	async getAllDailyProducts() {
		return await this.dailyProductRepository.list();
	}

	@Post()
	async createDailyProduct(@Body() dailyProductData: CreateDailyProductDTO) {
		const dailyProducts = new DailyProductEntity();
		dailyProducts.id = uuid();
		dailyProducts.productId = dailyProductData.productId;
		dailyProducts.quantity = dailyProductData.quantity;
		dailyProducts.createdAt = new Date();
		dailyProducts.updatedAt = null;
		dailyProducts.deletedAt = null;

		await this.dailyProductRepository.create(dailyProducts);
		return {
			product: dailyProducts,
			message: "Produto criado com sucesso",
		};
	}

	@Put("/:id")
	async updateDailyProduct(
		@Param("id") id: string,
		@Body() data: UpdateDailyProductDTO,
	) {
		const updatedProduct = await this.dailyProductRepository.update(id, data);
		return {
			product: updatedProduct,
			message: "Produto atualizado com sucesso",
		};
	}

	@Delete("/:id")
	async deleteDailyProduct(@Param("id") id: string) {
		const deletedProduct = await this.dailyProductRepository.delete(id);

		return {
			product: deletedProduct,
			message: "Produto deletado com sucesso",
		};
	}
}
