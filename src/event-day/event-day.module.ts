import { Module } from "@nestjs/common";
import { EventDayController } from "./event-day.controller";
import { EventDayRepository } from "./event-day.repository";

@Module({
  controllers: [EventDayController],
  providers: [EventDayRepository],
})
export class EventDayModule {}
