import { Module } from "@nestjs/common";
import { EventDayController } from "./event-day.controller";
import { EventDayRepository } from "./event-day.repository";
import { DailyProductModule } from "src/daily-product/daily-product.module";
import { ProductModule } from "src/product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventDayEntity } from "./event-day.entity";

@Module({
	imports: [
		DailyProductModule,
		ProductModule,
		TypeOrmModule.forFeature([EventDayEntity]),
	],
	controllers: [EventDayController],
	providers: [EventDayRepository],
})
export class EventDayModule {}
