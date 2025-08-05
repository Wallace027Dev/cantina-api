import { Module } from "@nestjs/common";
import { EventDayController } from "./event-day.controller";
import { EventDayRepository } from "./event-day.repository";
import { DailyProductModule } from "src/daily-product/daily-product.module";
import { ProductModule } from "src/product/product.module";

@Module({
	imports: [DailyProductModule, ProductModule],
	controllers: [EventDayController],
	providers: [EventDayRepository],
})
export class EventDayModule {}
