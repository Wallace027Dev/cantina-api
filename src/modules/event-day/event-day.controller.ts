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
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { EventDayService } from "./event-day.service";
import { CreateEventDayDTO } from "./dto/CreateEventDay.dto";
import { UpdateEventDayDTO } from "./dto/UpdateEventDay.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "src/resources/decorators/roles.decorator";

@Controller("/event-days")
export class EventDayController {
	constructor(
		private readonly eventDayService: EventDayService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@UseInterceptors(CacheInterceptor)
	@Get()
	async getAllEvents() {
		const events = await this.eventDayService.getAllEventDays();

		await this.cacheManager.set("events", events);

		return { message: "Eventos encontrados com sucesso", events };
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Post()
	async createEvent(@Body() eventData: CreateEventDayDTO) {
		const event = await this.eventDayService.createEventDay(eventData);

		await this.cacheManager.del("events");

		return { message: "Evento criado com sucesso", product: event };
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Put("/:id")
	async updateEvent(@Param("id") id: string, @Body() data: UpdateEventDayDTO) {
		const updatedEvent = await this.eventDayService.updateEventDay(id, data);

		await this.cacheManager.del("events");

		return { message: "Evento atualizado com sucesso", event: updatedEvent };
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Delete("/:id")
	async deleteEvent(@Param("id") id: string) {
		const removedEvent = await this.eventDayService.deleteEventDay(id);

		await this.cacheManager.del("events");

		return { message: "Evento deletado com sucesso", event: removedEvent };
	}
}
