import { SaleEntity } from "src/sale/sale.entity";

export class listUserDTO {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly role: "admin" | "employee",
		readonly sales: SaleEntity[],
		readonly createdAt: Date,
		readonly updatedAt?: Date | null,
		readonly deletedAt?: Date | null,
	) {}
}
