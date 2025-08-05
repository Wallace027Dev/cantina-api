import { v4 as uuid } from "uuid";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleRepository } from "./sale.repository";
import { SaleEntity } from "./sale.entity";
import { UpdateSaleDTO } from "./dto/UpdateSale.dto";

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

	@Put("/:id")
	async updateSale(@Param("id") id: string, @Body() data: UpdateSaleDTO) {
		const updatedSale = await this.saleRepository.update(id, data);
		return {
			sale: updatedSale,
			message: "Venda atualizada com sucesso",
		};
	}
}
