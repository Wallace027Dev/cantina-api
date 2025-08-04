import { Body, Controller, Get, Post } from "@nestjs/common";
import { EventRepository } from "./event-day.repository";

@Controller("/event-days")
export class EventDayController {
  constructor(private eventDayRepository: EventRepository) {}

  @Get()
  async getAllEvents() {
    return await this.eventDayRepository.list();
  }

  @Post()
  async createEvent(
    @Body() event: { date: Date; products: { name: string; price: number }[] },
  ) {
    return await this.eventDayRepository.create(event);
  }
}
