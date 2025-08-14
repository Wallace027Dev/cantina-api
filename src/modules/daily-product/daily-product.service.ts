import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateDailyProductDTO } from "./dto/CreateDailyProduct.dto";
import { DailyProductEntity } from "./daily-product.entity";
import { ProductEntity } from "../product/product.entity";
import { EventDayEntity } from "../event-day/event-day.entity";
import { EventDayService } from "../event-day/event-day.service";
import { ProductService } from "../product/product.service";

@Injectable()
export class DailyProductService {
	constructor(
		@InjectRepository(DailyProductEntity)
		private readonly dailyProductRepository: Repository<DailyProductEntity>,
		private readonly eventDayService: EventDayService,
		private readonly productService: ProductService,
	) {}

	async getAllDailyProducts() {
		return await this.dailyProductRepository.find({
			relations: ["product", "day"],
			select: {
				id: true,
				quantity: true,
				product: {
					id: true,
					name: true,
					price: true,
				},
				day: {
					id: true,
					date: true,
				},
			},
		});
	}

	async searchDailyProductById(id: string) {
		const dailyProduct = await this.dailyProductRepository.findOne({
			where: { id },
			relations: ["product", "day"],
			select: {
				id: true,
				quantity: true,
				product: {
					id: true,
					name: true,
					price: true,
				},
				day: {
					id: true,
					date: true,
				},
			},
		});

		if (dailyProduct === null) {
			throw new NotFoundException("Produto do dia não encontrado.");
		}

		return dailyProduct;
	}

	private async verifyDailyProductExists(productId: string, date: Date) {
		const dailyProduct = await this.dailyProductRepository.findOneBy({
			product: { id: productId },
			day: { date },
		});

		if (dailyProduct) {
			throw new ConflictException("O produto já está registrado nesse dia.");
		}
	}

	private createDailyProductInstance(data: {
		productId: string;
		eventDayId: string;
		quantity: number;
	}): DailyProductEntity {
		const dailyProductEntity = new DailyProductEntity();

		dailyProductEntity.product = { id: data.productId } as ProductEntity;
		dailyProductEntity.day = { id: data.eventDayId } as EventDayEntity;
		dailyProductEntity.quantity = data.quantity;
		dailyProductEntity.sales = [];

		return dailyProductEntity;
	}

	async createDailyProduct(dailyProduct: CreateDailyProductDTO) {
		const { date } = await this.eventDayService.searchEventDayById(
			dailyProduct.eventDayId,
		);
		await this.productService.searchProductById(dailyProduct.productId);
		await this.verifyDailyProductExists(dailyProduct.productId, date);

		const dailyProductEntiy = this.createDailyProductInstance(dailyProduct);

		return await this.dailyProductRepository.save(dailyProductEntiy);
	}

	async updateDailyProduct(
		id: string,
		dataForUpdate: Partial<DailyProductEntity>,
	) {
		const existingProduct = await this.searchDailyProductById(id);

		Object.assign(existingProduct, dataForUpdate as DailyProductEntity);

		await this.dailyProductRepository.update(id, existingProduct);
	}

	async deleteDailyProduct(id: string) {
		await this.dailyProductRepository.delete(id);
	}
}
