import { ProductService } from "./../product/product.service";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { EventDayService } from "./event-day.service";
import { v4 as uuid } from "uuid";
import { EventDayEntity } from "./event-day.entity";
import { CreateEventDayDTO } from "./dto/CreateEventDay.dto";
import { DailyProductEntity } from "src/daily-product/daily-product.entity";
import { DailyProductService } from "src/daily-product/daily-product.service";
import { UpdateEventDayDTO } from "./dto/UpdateEventDay.dto";
import { ProductEntity } from "src/product/product.entity";

@Controller("/event-days")
export class EventDayController {
	constructor(
		private eventDayService: EventDayService,
		private dailyProductService: DailyProductService,
		private productService: ProductService,
	) {}

	@Get()
	async getAllEvents() {
		return await this.eventDayService.getAllEventDays();
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
			const product = await this.productService.getProductById(p.productId);
			if (!product) throw new Error("Produto não encontrado.");
		}

		// montar o DailyProducts
		const dailyProducts: DailyProductEntity[] = event.products.map((p) => {
			const dp = new DailyProductEntity();
			dp.id = uuid();

			dp.product = { id: p.productId } as ProductEntity;
			dp.day = { id: eventEntity.id } as EventDayEntity;

			dp.quantity = p.quantity;
			dp.createdAt = new Date();
			dp.updatedAt = null;
			dp.deletedAt = null;
			dp.sales = [];
			return dp;
		});

		// salva cada um (pode ser paralelo se quiser)
		for (const dp of dailyProducts) {
			await this.dailyProductService.createDailyProduct(dp);
		}

		// anexar ao eventEntity pra resposta
		eventEntity.products = dailyProducts;

		// Salve o EventDay
		eventEntity.products = dailyProducts;

		await this.eventDayService.createEventDay(eventEntity);
		return {
			product: eventEntity,
			message: "Evento criado com sucesso",
		};
	}

	@Put("/:id")
	async updateEvent(@Param("id") id: string, @Body() data: UpdateEventDayDTO) {
		const updatedEvent = await this.eventDayService.updateEventDay(id, data);
		return {
			event: updatedEvent,
			message: "Evento atualizado com sucesso",
		};
	}

	@Delete("/:id")
	async deleteEvent(@Param("id") id: string) {
		const removedEvent = await this.eventDayService.deleteEventDay(id);

		return {
			event: removedEvent,
			message: "Evento deletado com sucesso",
		};
	}
}
