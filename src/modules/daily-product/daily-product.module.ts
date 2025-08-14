import { forwardRef, Module } from "@nestjs/common";
import { DailyProductController } from "./daily-product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyProductEntity } from "./daily-product.entity";
import { DailyProductService } from "./daily-product.service";
import { EventDayModule } from "../event-day/event-day.module";
import { ProductModule } from "../product/product.module";

@Module({
	imports: [
		ProductModule,
		forwardRef(() => EventDayModule),
		TypeOrmModule.forFeature([DailyProductEntity]),
	],
	providers: [DailyProductService],
	controllers: [DailyProductController],
	exports: [DailyProductService],
})
export class DailyProductModule {}
