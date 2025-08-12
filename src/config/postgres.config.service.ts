import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { DailyProductEntity } from "../modules/daily-product/daily-product.entity";
import { EventDayEntity } from "../modules/event-day/event-day.entity";
import { ProductEntity } from "../modules/product/product.entity";
import { SaleEntity } from "../modules/sale/sale.entity";
import { UserEntity } from "../modules/user/user.entity";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "postgres",
			host: this.configService.get<string>("DB_HOST"),
			port: this.configService.get<number>("DB_PORT"),
			username: this.configService.get<string>("DB_USERNAME"),
			password: this.configService.get<string>("DB_PASSWORD"),
			database: this.configService.get<string>("DB_NAME"),
			entities: [
				UserEntity,
				SaleEntity,
				ProductEntity,
				DailyProductEntity,
				EventDayEntity,
			],
			synchronize: true,
		};
	}
}
