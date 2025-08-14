import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProductService } from "../product/product.service";
import { EventDayEntity } from "./event-day.entity";
import { CreateEventDayDTO } from "./dto/CreateEventDay.dto";
import { UpdateEventDayDTO } from "./dto/UpdateEventDay.dto";
import { DailyProductService } from "../daily-product/daily-product.service";

@Injectable()
export class EventDayService {
	constructor(
		@InjectRepository(EventDayEntity)
		private readonly eventDayRepository: Repository<EventDayEntity>,
		@Inject(forwardRef(() => DailyProductService))
		private readonly dailyProductService: DailyProductService,
		private readonly productService: ProductService,
	) {}

	async getAllEventDays() {
		return this.eventDayRepository.find({
			relations: ["products", "products.product"],
			select: {
				id: true,
				date: true,
				products: {
					id: true,
					quantity: true,
					product: {
						id: true,
						name: true,
					},
				},
			},
		});
	}

	async searchEventDayById(id: string) {
		const event = await this.eventDayRepository.findOneBy({ id });

		if (event === null) {
			throw new NotFoundException("Event not found.");
		}

		return event;
	}

	async createEventDay(eventData: CreateEventDayDTO) {
		// Cria e salva o evento inicialmente (sem produtos)
		const eventEntity = this.eventDayRepository.create({
			date: eventData.date,
		});
		const savedEvent = await this.eventDayRepository.save(eventEntity);

		// Cria um array de promises para criar daily products
		const dailyProductsPromises = eventData.products.map(async (product) => {
			const productExists = await this.productService.searchProductById(
				product.productId,
			);

			const dailyProductData = {
				productId: productExists.id,
				eventDayId: savedEvent.id,
				quantity: product.quantity,
			};

			return this.dailyProductService.createDailyProduct(dailyProductData);
		});

		const createdDailyProducts = await Promise.all(dailyProductsPromises);

		// Associa os daily products criados ao evento
		savedEvent.products = createdDailyProducts;

		return savedEvent;
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
