import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DailyProductEntity } from "./daily-product.entity";

@Injectable()
export class DailyProductService {
	constructor(
		@InjectRepository(DailyProductEntity)
		private readonly dailyProductRepository: Repository<DailyProductEntity>,
	) {}

	async getAllDailyProducts() {
		return await this.dailyProductRepository.find();
	}

	async getDailyProductById(id: string) {
		const dailyProduct = await this.dailyProductRepository.findOneBy({ id });

		if (dailyProduct === null) {
			throw new NotFoundException("Produto do dia nao encontrado.");
		}

		return dailyProduct;
	}

	async createDailyProduct(dailyProduct: DailyProductEntity) {
		return await this.dailyProductRepository.save(dailyProduct);
	}

	async updateDailyProduct(
		id: string,
		dataForUpdate: Partial<DailyProductEntity>,
	) {
		const existingProduct = await this.dailyProductRepository.findOneBy({ id });

		Object.assign(existingProduct!, dataForUpdate as DailyProductEntity);

		await this.dailyProductRepository.update(id, existingProduct!);
	}

	async deleteDailyProduct(id: string) {
		await this.dailyProductRepository.delete(id);
	}
}
