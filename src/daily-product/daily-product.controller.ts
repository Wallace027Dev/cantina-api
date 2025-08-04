import { Body, Controller, Get, Post } from "@nestjs/common";
import { DailyProductRepository } from "./daily-product.repository";
import { v4 as uuid } from "uuid";
import { CreateDailyProductDTO } from "./dto/DailyProduct.dto";
import { DailyProductEntity } from "./daily-product.entity";

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
		dailyProducts.eventDayId = dailyProductData.eventDayId;
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
}
