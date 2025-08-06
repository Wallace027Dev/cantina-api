import { Module } from "@nestjs/common";
import { SaleController } from "./sale.controller";
import { SaleRepository } from "./sale.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleEntity } from "./sale.entity";
import { SaleService } from "./sale.service";
import { DailyProductModule } from "src/daily-product/daily-product.module";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([SaleEntity]),
		DailyProductModule,
		UserModule,
	],
	controllers: [SaleController],
	providers: [SaleRepository, SaleService],
})
export class SaleModule {}
