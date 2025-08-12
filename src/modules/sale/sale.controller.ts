import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleService } from "./sale.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("/sales")
export class SaleController {
	constructor(private saleService: SaleService) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllSales() {
		return await this.saleService.getAllSales();
	}

	@Post()
	async createSale(@Body() saleData: CreateSaleDTO) {
		const saleEntity = await this.saleService.createSale(saleData);

		return {
			sale: saleEntity,
			message: "Venda criada com sucesso",
		};
	}
}
