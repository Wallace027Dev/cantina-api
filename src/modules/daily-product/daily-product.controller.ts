import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseInterceptors,
} from "@nestjs/common";
import { CreateDailyProductDTO } from "./dto/CreateDailyProduct.dto";
import { UpdateDailyProductDTO } from "./dto/UpdateDailyProduct.dto";
import { DailyProductService } from "./daily-product.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("daily-products")
export class DailyProductController {
	constructor(private dailyProductService: DailyProductService) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllDailyProducts() {
		return await this.dailyProductService.getAllDailyProducts();
	}

	@Post()
	async createDailyProduct(@Body() data: CreateDailyProductDTO) {
		const dailyProduct =
			await this.dailyProductService.createDailyProduct(data);

		return {
			product: dailyProduct,
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
		return {
			product: updatedProduct,
			message: "Produto atualizado com sucesso",
		};
	}

	@Delete("/:id")
	async deleteDailyProduct(@Param("id") id: string) {
		const deletedProduct =
			await this.dailyProductService.deleteDailyProduct(id);

		return {
			product: deletedProduct,
			message: "Produto deletado com sucesso",
		};
	}
}
