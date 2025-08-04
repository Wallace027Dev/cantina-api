import { SaleEntity } from "src/sale/sale.entity";

export class DailyProductEntity {
	id: string;
	productId: string;
	eventDayId: string;
	quantity: number;
	sales: SaleEntity[];
	createdAt: Date;
	updatedAt?: Date | null;
	deletedAt?: Date | null;
}
