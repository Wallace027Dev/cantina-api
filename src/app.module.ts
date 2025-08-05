import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SaleModule } from "./sale/sale.module";
import { ProductModule } from "./product/product.module";
import { DailyProductModule } from "./daily-product/daily-product.module";
import { EventDayModule } from "./event-day/event-day.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigService } from "./config/postgres.config.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		UserModule,
		SaleModule,
		ProductModule,
		DailyProductModule,
		EventDayModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfigService,
			inject: [PostgresConfigService],
		}),
	],
})
export class AppModule {}
