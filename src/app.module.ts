import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";

import { UserModule } from "./modules/user/user.module";
import { SaleModule } from "./modules/sale/sale.module";
import { ProductModule } from "./modules/product/product.module";
import { DailyProductModule } from "./modules/daily-product/daily-product.module";
import { EventDayModule } from "./modules/event-day/event-day.module";

import { PostgresConfigService } from "./config/postgres.config.service";
import { GlobalExceptionFilter } from "./resources/filters/global-exception-filter";

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
