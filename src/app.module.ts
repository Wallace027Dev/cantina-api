import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SaleModule } from "./sale/sale.module";
import { ProductModule } from "./product/product.module";
import { DailyProductModule } from "./daily-product/daily-product.module";
import { EventDayModule } from "./event-day/event-day.module";

@Module({
	imports: [
		UserModule,
		SaleModule,
		ProductModule,
		DailyProductModule,
		EventDayModule,
	],
})
export class AppModule {}
