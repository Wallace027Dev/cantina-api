import type { Cache } from "cache-manager";
import {
	Body,
	Controller,
	Get,
	Inject,
	Post,
	UseInterceptors,
} from "@nestjs/common";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleService } from "./sale.service";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";

@Controller("/sales")
export class SaleController {
	constructor(
		private saleService: SaleService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllSales() {
		const sales = await this.saleService.getAllSales();

		await this.cacheManager.set("sales", sales);

		return sales;
	}

	@Post()
	async createSale(@Body() saleData: CreateSaleDTO) {
		const saleEntity = await this.saleService.createSale(saleData);

		await this.cacheManager.del("sales");

		return {
			sale: saleEntity,
			message: "Venda criada com sucesso",
		};
	}
}
