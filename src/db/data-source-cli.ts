import { DailyProductEntity } from "../daily-product/daily-product.entity";
import { EventDayEntity } from "../event-day/event-day.entity";
import { ProductEntity } from "../product/product.entity";
import { SaleEntity } from "../sale/sale.entity";
import { UserEntity } from "../user/user.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [
		UserEntity,
		SaleEntity,
		ProductEntity,
		DailyProductEntity,
		EventDayEntity,
	],
	migrations: ["src/db/migrations/*.ts"],
	synchronize: false,
	logging: false,
});
