import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProductService } from "../product/product.service";
import { EventDayEntity } from "./event-day.entity";
import { DailyProductEntity } from "../daily-product/daily-product.entity";
import { CreateEventDayDTO } from "./dto/CreateEventDay.dto";
import { UpdateEventDayDTO } from "./dto/UpdateEventDay.dto";

@Injectable()
export class EventDayService {
	constructor(
		@InjectRepository(EventDayEntity)
		private readonly eventDayRepository: Repository<EventDayEntity>,
		@InjectRepository(DailyProductEntity)
		private readonly dailyProductRepository: Repository<DailyProductEntity>,
		private readonly productService: ProductService,
	) {}

	async getAllEventDays() {
		return this.eventDayRepository.find();
	}

	async searchEventDayById(id: string) {
		const event = await this.eventDayRepository.findOneBy({ id });

		if (event === null) {
			throw new NotFoundException("Event not found.");
		}

		return event;
	}

	async createEventDay(eventData: CreateEventDayDTO) {
		// Cria o evento
		const eventEntity = new EventDayEntity();
		eventEntity.date = eventData.date;
		eventEntity.products = [];

		const savedEvent = await this.eventDayRepository.save(eventEntity);

		const dailyProducts: DailyProductEntity[] = [];

		for (const p of eventData.products) {
			// Busca o produto correto e armazena
			const productEntity = await this.productService.searchProductById(
				p.productId,
			);

			// Instancia DailyProduct corretamente
			const dailyProduct = new DailyProductEntity();
			dailyProduct.product = productEntity; // entidade Produto
			dailyProduct.day = savedEvent; // entidade Evento
			dailyProduct.quantity = p.quantity;
			dailyProduct.sales = [];

			dailyProducts.push(dailyProduct);
		}

		// Salva todos os DailyProducts
		await this.dailyProductRepository.save(dailyProducts);

		// Recarrega o evento com os produtos para retorno
		const eventWithProducts = await this.eventDayRepository.findOne({
			where: { id: savedEvent.id },
			relations: ["products", "products.product"],
		});

		return eventWithProducts!;
	}

	async updateEventDay(
		id: string,
		dataForUpdate: UpdateEventDayDTO,
	): Promise<EventDayEntity> {
		const existingEvent = await this.searchEventDayById(id);

		Object.assign(existingEvent, dataForUpdate);

		return this.eventDayRepository.save(existingEvent);
	}

	async deleteEventDay(id: string): Promise<EventDayEntity> {
		const existingEvent = await this.searchEventDayById(id);

		await this.eventDayRepository.remove(existingEvent);

		return existingEvent;
	}
}
