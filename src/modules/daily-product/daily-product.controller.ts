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
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { CreateDailyProductDTO } from "./dto/CreateDailyProduct.dto";
import { UpdateDailyProductDTO } from "./dto/UpdateDailyProduct.dto";
import { DailyProductService } from "./daily-product.service";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "./../../resources/decorators/roles.decorator";

@Controller("daily-products")
export class DailyProductController {
	constructor(
		private dailyProductService: DailyProductService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@UseInterceptors(CacheInterceptor)
	@Get()
	async getAllDailyProducts() {
		const dailyProducts = await this.dailyProductService.getAllDailyProducts();

		await this.cacheManager.set("dailyProducts", dailyProducts);

		return { message: "Produtos encontrados com sucesso", dailyProducts };
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Post()
	async createDailyProduct(@Body() data: CreateDailyProductDTO) {
		const dp = await this.dailyProductService.createDailyProduct(data);

		await this.cacheManager.del("dailyProducts");

		return {
			message: "Produto criado com sucesso",
			product: dp,
		};
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
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
			message: "Produto atualizado com sucesso",
			product: updatedProduct,
		};
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Delete("/:id")
	async deleteDailyProduct(@Param("id") id: string) {
		const dp = await this.dailyProductService.deleteDailyProduct(id);

		await this.cacheManager.del("dailyProducts");

		return {
			message: "Produto deletado com sucesso",
			product: dp,
		};
	}
}
