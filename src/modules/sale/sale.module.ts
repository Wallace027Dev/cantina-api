import { Module } from "@nestjs/common";
import { SaleController } from "./sale.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleEntity } from "./sale.entity";
import { SaleService } from "./sale.service";
import { DailyProductModule } from "../daily-product/daily-product.module";
import { UserModule } from "../user/user.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([SaleEntity]),
		DailyProductModule,
		UserModule,
	],
	controllers: [SaleController],
	providers: [SaleService],
})
export class SaleModule {}
