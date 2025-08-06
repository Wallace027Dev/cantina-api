import { Injectable } from "@nestjs/common";
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
		return await this.dailyProductRepository.findOneBy({ id });
	}

	async createDailyProduct(
		dailyProduct: DailyProductEntity,
	): Promise<DailyProductEntity> {
		return await this.dailyProductRepository.save(dailyProduct);
	}

	async updateDailyProduct(
		id: string,
		dataForUpdate: Partial<DailyProductEntity>,
	) {
		await this.dailyProductRepository.update(id, dataForUpdate);
	}

	async deleteDailyProduct(id: string) {
		await this.dailyProductRepository.delete(id);
	}
}
