import { SaleEntity } from "src/sale/sale.entity";
import { Role } from "../user.entity";

export class listUserDTO {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly role: Role,
		readonly sales?: SaleEntity[],
	) {}
}
