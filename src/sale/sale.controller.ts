import { v4 as uuid } from "uuid";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleService } from "./sale.service";
import { SaleEntity } from "./sale.entity";
import { UpdateSaleDTO } from "./dto/UpdateSale.dto";
import { DailyProductEntity } from "src/daily-product/daily-product.entity";
import { UserEntity } from "src/user/user.entity";

@Controller("/sales")
export class SaleController {
	constructor(private saleService: SaleService) {}

	@Get()
	async getAllSales() {
		return await this.saleService.getAllSales();
	}

	@Post()
	async createSale(@Body() saleData: CreateSaleDTO) {
		const saleEntity = new SaleEntity();
		saleEntity.id = uuid();

		const user = new UserEntity();
		user.id = saleData.userId;

		const dailyProduct = new DailyProductEntity();
		dailyProduct.id = saleData.dailyProductId;

		saleEntity.user = user;
		saleEntity.dailyProduct = dailyProduct;
		saleEntity.quantitySold = saleData.quantitySold;
		saleEntity.createdAt = new Date();

		await this.saleService.createSale(saleEntity);

		return {
			sale: saleEntity,
			message: "Venda criada com sucesso",
		};
	}

	@Put("/:id")
	async updateSale(@Param("id") id: string, @Body() data: UpdateSaleDTO) {
		const updatedSale = await this.saleService.updateSale(id, data);
		return {
			sale: updatedSale,
			message: "Venda atualizada com sucesso",
		};
	}

	@Delete("/:id")
	async deleteSale(@Param("id") id: string) {
		const removedSale = await this.saleService.deleteSale(id);
		return {
			sale: removedSale,
			message: "Venda deletada com sucesso",
		};
	}
}
