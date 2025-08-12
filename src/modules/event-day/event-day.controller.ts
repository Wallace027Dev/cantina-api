import type { Cache } from "cache-manager";
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	UseInterceptors,
} from "@nestjs/common";
import { EventDayService } from "./event-day.service";
import { CreateEventDayDTO } from "./dto/CreateEventDay.dto";
import { UpdateEventDayDTO } from "./dto/UpdateEventDay.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";

@Controller("/event-days")
export class EventDayController {
	constructor(
		private readonly eventDayService: EventDayService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllEvents() {
		const events = await this.eventDayService.getAllEventDays();

		await this.cacheManager.set("events", events);

		return events;
	}

	@Post()
	async createEvent(@Body() eventData: CreateEventDayDTO) {
		const event = await this.eventDayService.createEventDay(eventData);

		await this.cacheManager.del("events");

		return { product: event, message: "Evento criado com sucesso" };
	}

	@Put("/:id")
	async updateEvent(@Param("id") id: string, @Body() data: UpdateEventDayDTO) {
		const updatedEvent = await this.eventDayService.updateEventDay(id, data);

		await this.cacheManager.del("events");

		return { event: updatedEvent, message: "Evento atualizado com sucesso" };
	}

	@Delete("/:id")
	async deleteEvent(@Param("id") id: string) {
		const removedEvent = await this.eventDayService.deleteEventDay(id);

		await this.cacheManager.del("events");

		return { event: removedEvent, message: "Evento deletado com sucesso" };
	}
}
