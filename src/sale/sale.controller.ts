import { v4 as uuid } from "uuid";
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleService } from "./sale.service";
import { SaleEntity } from "./sale.entity";
import { UpdateSaleDTO } from "./dto/UpdateSale.dto";
import { DailyProductService } from "src/daily-product/daily-product.service";
import { UserService } from "src/user/user.service";

@Controller("/sales")
export class SaleController {
	constructor(
		private saleService: SaleService,
		private dailyProductService: DailyProductService,
		private userService: UserService,
	) {}

	@Get()
	async getAllSales() {
		return await this.saleService.getAllSales();
	}

	@Post()
	async createSale(@Body() saleData: CreateSaleDTO) {
		// Verifica se o produto do dia existe e tem quantidade suficiente
		const dailyProduct = await this.dailyProductService.getDailyProductById(
			saleData.dailyProductId,
		);
		if (!dailyProduct) {
			throw new NotFoundException("Produto do dia não encontrado");
		}

		if (dailyProduct.quantity < saleData.quantitySold) {
			throw new BadRequestException("Quantidade insuficiente em estoque");
		}

		// Verifica se o usuário existe
		const user = await this.userService.getUserById(saleData.userId);
		if (!user) {
			throw new NotFoundException("Usuário não encontrado");
		}

		// Atualiza estoque
		dailyProduct.quantity -= saleData.quantitySold;
		await this.dailyProductService.updateDailyProduct(
			dailyProduct.id,
			dailyProduct,
		);

		// Cria a venda
		const saleEntity = new SaleEntity();
		saleEntity.id = uuid();
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
