import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SaleModule } from "./sale/sale.module";
import { ProductModule } from "./product/product.module";
import { DailyProductModule } from "./daily-product/daily-product.module";
import { EventDayModule } from "./event-day/event-day.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigService } from "./config/postgres.config.service";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { GlobalExceptionFilter } from "./filters/global-exception-filter";

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
	providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
