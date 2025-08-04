import { DailyProductEntity } from "src/daily-product/daily-product.entity";

export class ProductEntity {
	id: string;
	name: string;
	price: number;
	dailyProducts: DailyProductEntity[];
	createdAt: Date;
	updatedAt?: Date | null;
	deletedAt?: Date | null;
}
