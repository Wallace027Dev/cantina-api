import { forwardRef, Module } from "@nestjs/common";
import { EventDayController } from "./event-day.controller";
import { DailyProductModule } from "src/daily-product/daily-product.module";
import { ProductModule } from "src/product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventDayEntity } from "./event-day.entity";
import { EventDayService } from "./event-day.service";
import { DailyProductEntity } from "src/daily-product/daily-product.entity";

@Module({
	imports: [
		ProductModule,
		forwardRef(() => DailyProductModule),
		TypeOrmModule.forFeature([EventDayEntity, DailyProductEntity]),
	],
	controllers: [EventDayController],
	providers: [EventDayService],
	exports: [EventDayService],
})
export class EventDayModule {}
