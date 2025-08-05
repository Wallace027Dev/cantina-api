import { Module } from "@nestjs/common";
import { DailyProductController } from "./daily-product.controller";
import { DailyProductRepository } from "./daily-product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyProductEntity } from "./daily-product.entity";
import { DailyProductService } from "./daily-product.service";

@Module({
	imports: [TypeOrmModule.forFeature([DailyProductEntity])],
	providers: [DailyProductRepository, DailyProductService],
	controllers: [DailyProductController],
	exports: [DailyProductRepository, DailyProductService],
})
export class DailyProductModule {}
