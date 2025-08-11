import { Module } from "@nestjs/common";
import { DailyProductController } from "./daily-product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyProductEntity } from "./daily-product.entity";
import { DailyProductService } from "./daily-product.service";

@Module({
	imports: [TypeOrmModule.forFeature([DailyProductEntity])],
	providers: [DailyProductService],
	controllers: [DailyProductController],
	exports: [DailyProductService],
})
export class DailyProductModule {}
