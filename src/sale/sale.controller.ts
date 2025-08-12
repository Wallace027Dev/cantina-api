import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleService } from "./sale.service";

@Controller("/sales")
export class SaleController {
	constructor(private saleService: SaleService) {}

	@Get()
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
