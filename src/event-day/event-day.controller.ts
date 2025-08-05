import { ProductRepository } from "./../product/product.repository";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { EventDayRepository } from "./event-day.repository";
import { v4 as uuid } from "uuid";
import { EventDayEntity } from "./event-day.entity";
import { CreateEventDayDTO } from "./dto/CreateEventDay.dto";
import { DailyProductEntity } from "src/daily-product/daily-product.entity";
import { DailyProductRepository } from "src/daily-product/daily-product.repository";
import { UpdateEventDayDTO } from "./dto/UpdateEventDay.dto";

@Controller("/event-days")
export class EventDayController {
	constructor(
		private eventDayRepository: EventDayRepository,
		private dailyProductRepository: DailyProductRepository,
		private productRepository: ProductRepository,
	) {}

	@Get()
	async getAllEvents() {
		return await this.eventDayRepository.list();
	}

	@Post()
	async createEvent(@Body() event: CreateEventDayDTO) {
		// monta o EventDay
		const eventEntity = new EventDayEntity();
		eventEntity.id = uuid();
		eventEntity.date = event.date;
		eventEntity.products = [];

		// verifica se o produto existe
		for (const p of event.products) {
			const product = await this.productRepository.findById(p.productId);
			if (!product) throw new Error("Produto não encontrado.");
		}

		// montar o DailyProducts
		const dailyProducts: DailyProductEntity[] = event.products.map((p) => {
			const dp = new DailyProductEntity();
			dp.id = uuid();
			dp.productId = p.productId;
			dp.eventDayId = eventEntity.id;
			dp.quantity = p.quantity;
			dp.createdAt = new Date();
			dp.updatedAt = null;
			dp.deletedAt = null;
			dp.sales = [];
			return dp;
		});

		// salva cada um (pode ser paralelo se quiser)
		for (const dp of dailyProducts) {
			await this.dailyProductRepository.create(dp);
		}

		// anexar ao eventEntity pra resposta
		eventEntity.products = dailyProducts;

		// Salve o EventDay
		eventEntity.products = dailyProducts;

		await this.eventDayRepository.create(eventEntity);
		return {
			product: eventEntity,
			message: "Evento criado com sucesso",
		};
	}

	@Put("/:id")
	async updateEvent(@Param("id") id: string, @Body() data: UpdateEventDayDTO) {
		const updatedEvent = await this.eventDayRepository.update(id, data);
		return {
			event: updatedEvent,
			message: "Evento atualizado com sucesso",
		};
	}

	@Delete("/:id")
	async deleteEvent(@Param("id") id: string) {
		const removedEvent = await this.eventDayRepository.delete(id);

		return {
			event: removedEvent,
			message: "Evento deletado com sucesso",
		};
	}
}
