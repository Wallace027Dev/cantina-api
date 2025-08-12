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
import { CreateEventDayDTO } from "./dto/CreateEventDay.dto";
import { UpdateEventDayDTO } from "./dto/UpdateEventDay.dto";

@Controller("/event-days")
export class EventDayController {
	constructor(private readonly eventDayService: EventDayService) {}

	@Get()
	async getAllEvents() {
		return await this.eventDayService.getAllEventDays();
	}

	@Post()
	async createEvent(@Body() eventData: CreateEventDayDTO) {
		const event = await this.eventDayService.createEventDay(eventData);

		return { product: event, message: "Evento criado com sucesso" };
	}

	@Put("/:id")
	async updateEvent(@Param("id") id: string, @Body() data: UpdateEventDayDTO) {
		const updatedEvent = await this.eventDayService.updateEventDay(id, data);

		return { event: updatedEvent, message: "Evento atualizado com sucesso" };
	}

	@Delete("/:id")
	async deleteEvent(@Param("id") id: string) {
		const removedEvent = await this.eventDayService.deleteEventDay(id);

		return { event: removedEvent, message: "Evento deletado com sucesso" };
	}
}
