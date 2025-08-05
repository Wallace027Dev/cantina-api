import { CreateDailyProductDTO } from "src/daily-product/dto/DailyProduct.dto";

export class ProductEntity {
	id: string;
	name: string;
	price: number;
	dailyProducts: CreateDailyProductDTO[];
	createdAt: Date;
	updatedAt?: Date | null;
	deletedAt?: Date | null;
}
