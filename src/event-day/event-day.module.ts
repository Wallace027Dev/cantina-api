import { Module } from "@nestjs/common";
import { EventDayController } from "./event-day.controller";
import { EventDayRepository } from "./event-day.repository";
import { DailyProductModule } from "src/daily-product/daily-product.module";

@Module({
	imports: [DailyProductModule],
	controllers: [EventDayController],
	providers: [EventDayRepository],
})
export class EventDayModule {}
