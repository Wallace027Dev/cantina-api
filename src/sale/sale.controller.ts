import { Body, Controller, Get, Post } from "@nestjs/common";
import { SaleRepository } from "./sale.repository";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleEntity } from "./sale.entity";
import { v4 as uuid } from "uuid";

@Controller("/sales")
export class SaleController {
	constructor(private saleRepository: SaleRepository) {}

	@Get()
	async getAllSales() {
		return await this.saleRepository.list();
	}

	@Post()
	async createSale(@Body() saleData: CreateSaleDTO) {
		const saleEntity = new SaleEntity();
		saleEntity.id = uuid();
		saleEntity.userId = saleData.userId;
		saleEntity.dailyProductId = saleData.dailyProductId;
		saleEntity.quantitySold = saleData.quantitySold;
		saleEntity.createdAt = new Date();
		await this.saleRepository.save(saleEntity);
		return {
			sale: saleEntity,
			message: "Venda criada com sucesso",
		};
	}
}
