import {
	ClassSerializerInterceptor,
	ConsoleLogger,
	Module,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { UserModule } from "./modules/user/user.module";
import { SaleModule } from "./modules/sale/sale.module";
import { ProductModule } from "./modules/product/product.module";
import { DailyProductModule } from "./modules/daily-product/daily-product.module";
import { EventDayModule } from "./modules/event-day/event-day.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CustomLoggerModule } from "./modules/logger/logger.module";

import { PostgresConfigService } from "./config/postgres.config.service";
import { GlobalExceptionFilter } from "./resources/filters/global-exception-filter";
import { redisStore } from "cache-manager-redis-yet";
import { LoggerGlobalInterceptor } from "./resources/interceptors/logger-global/logger-global.interceptor";

@Module({
	imports: [
		UserModule,
		SaleModule,
		ProductModule,
		DailyProductModule,
		EventDayModule,
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: async () => ({
				store: await redisStore({
					socket: {
						host: "localhost",
						port: 6379,
					},
					ttl: 10_000,
				}),
			}),
		}),
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfigService,
			inject: [PostgresConfigService],
		}),
		AuthModule,
		CustomLoggerModule,
	],
	providers: [
		{ provide: APP_FILTER, useClass: GlobalExceptionFilter },
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerGlobalInterceptor,
		},
		ConsoleLogger,
	],
})
export class AppModule {}
