import { Module } from "@nestjs/common";
import { EventDayController } from "./event-day.controller";
import { EventDayRepository } from "./event-day.repository";
import { DailyProductModule } from "src/daily-product/daily-product.module";
import { ProductModule } from "src/product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventDayEntity } from "./event-day.entity";
import { EventDayService } from "./event-day.service";

@Module({
	imports: [
		ProductModule,
		TypeOrmModule.forFeature([EventDayEntity]),
		DailyProductModule,
	],
	controllers: [EventDayController],
	providers: [EventDayRepository, EventDayService],
})
export class EventDayModule {}
