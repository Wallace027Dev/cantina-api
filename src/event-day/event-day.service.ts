import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProductService } from "../product/product.service";
import { EventDayEntity } from "./event-day.entity";
import { DailyProductEntity } from "../daily-product/daily-product.entity";
import { ProductEntity } from "../product/product.entity";
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

	async getAllEventDays(): Promise<EventDayEntity[]> {
		return this.eventDayRepository.find();
	}

	async createEventDayWithProducts(
		eventData: CreateEventDayDTO,
	): Promise<EventDayEntity> {
		// Cria o evento
		const eventEntity = this.eventDayRepository.create({
			date: eventData.date,
			products: [],
		});
		const savedEvent = await this.eventDayRepository.save(eventEntity);

		// Verifica e cria os produtos do dia
		const dailyProducts: DailyProductEntity[] = [];
		for (const p of eventData.products) {
			const product = await this.productService.searchProductById(p.productId);
			if (!product) {
				throw new NotFoundException(
					`Produto com ID ${p.productId} não encontrado`,
				);
			}

			const dp = this.dailyProductRepository.create({
				product: { id: p.productId } as ProductEntity,
				day: { id: savedEvent.id } as EventDayEntity,
				quantity: p.quantity,
				sales: [],
			});

			dailyProducts.push(dp);
		}

		// Salva os produtos e anexa ao evento
		await this.dailyProductRepository.save(dailyProducts);
		savedEvent.products = dailyProducts;

		return this.eventDayRepository.save(savedEvent);
	}

	async updateEventDay(
		id: string,
		dataForUpdate: UpdateEventDayDTO,
	): Promise<EventDayEntity> {
		const existingEvent = await this.eventDayRepository.findOneBy({ id });
		if (!existingEvent) throw new NotFoundException("Evento não encontrado");

		Object.assign(existingEvent, dataForUpdate);
		return this.eventDayRepository.save(existingEvent);
	}

	async deleteEventDay(id: string): Promise<EventDayEntity> {
		const existingEvent = await this.eventDayRepository.findOneBy({ id });
		if (!existingEvent) throw new NotFoundException("Evento não encontrado");

		await this.eventDayRepository.remove(existingEvent);
		return existingEvent;
	}
}
