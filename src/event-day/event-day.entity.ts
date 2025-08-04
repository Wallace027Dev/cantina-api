import { CreateDailyProductDTO } from "src/daily-product/dto/DailyProduct.dto";

export class EventDayEntity {
	id: string;
	date: Date;
	products: CreateDailyProductDTO[];
}
