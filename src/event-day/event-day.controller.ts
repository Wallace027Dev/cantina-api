import { Body, Controller, Get, Post } from "@nestjs/common";
import { EventDayRepository } from "./event-day.repository";

@Controller("/event-days")
export class EventDayController {
  constructor(private eventDayRepository: EventDayRepository) {}

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
