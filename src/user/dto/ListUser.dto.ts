import { SaleEntity } from "src/sale/sale.entity";
import { Role } from "../user.entity";

export class listUserDTO {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly role: Role,
		readonly sales: SaleEntity[],
		readonly createdAt: Date,
		readonly updatedAt?: Date | null,
		readonly deletedAt?: Date | null,
	) {}
}
