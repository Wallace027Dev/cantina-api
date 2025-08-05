import { Module } from "@nestjs/common";
import { DailyProductController } from "./daily-product.controller";
import { DailyProductRepository } from "./daily-product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyProductEntity } from "./daily-product.entity";

@Module({
	imports: [TypeOrmModule.forFeature([DailyProductEntity])],
	providers: [DailyProductRepository],
	controllers: [DailyProductController],
	exports: [DailyProductRepository],
})
export class DailyProductModule {}
