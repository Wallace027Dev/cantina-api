import type { Cache } from "cache-manager";
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	UseInterceptors,
} from "@nestjs/common";
import { CreateDailyProductDTO } from "./dto/CreateDailyProduct.dto";
import { UpdateDailyProductDTO } from "./dto/UpdateDailyProduct.dto";
import { DailyProductService } from "./daily-product.service";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";

@Controller("daily-products")
export class DailyProductController {
	constructor(
		private dailyProductService: DailyProductService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllDailyProducts() {
		const dailyProducts = await this.dailyProductService.getAllDailyProducts();

		await this.cacheManager.set("dailyProducts", dailyProducts);

		return dailyProducts;
	}

	@Post()
	async createDailyProduct(@Body() data: CreateDailyProductDTO) {
		const dp = await this.dailyProductService.createDailyProduct(data);

		await this.cacheManager.del("dailyProducts");

		return {
			product: dp,
			message: "Produto criado com sucesso",
		};
	}

	@Put("/:id")
	async updateDailyProduct(
		@Param("id") id: string,
		@Body() data: UpdateDailyProductDTO,
	) {
		const updatedProduct = await this.dailyProductService.updateDailyProduct(
			id,
			data,
		);

		await this.cacheManager.del("dailyProducts");

		return {
			product: updatedProduct,
			message: "Produto atualizado com sucesso",
		};
	}

	@Delete("/:id")
	async deleteDailyProduct(@Param("id") id: string) {
		const dp = await this.dailyProductService.deleteDailyProduct(id);

		await this.cacheManager.del("dailyProducts");

		return {
			product: dp,
			message: "Produto deletado com sucesso",
		};
	}
}
