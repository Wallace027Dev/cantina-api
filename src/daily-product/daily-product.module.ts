import { Module } from "@nestjs/common";
import { DailyProductController } from "./daily-product.controller";
import { DailyProductRepository } from "./daily-product.repository";

@Module({
	providers: [DailyProductRepository],
	controllers: [DailyProductController],
	exports: [DailyProductRepository],
})
export class DailyProductModule {}
