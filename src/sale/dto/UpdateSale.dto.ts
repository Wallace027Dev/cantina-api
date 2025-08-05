import { IsNumber } from "class-validator";

export class UpdateSaleDTO {
	@IsNumber({}, { message: "quantitySold precisa ser um number" })
	quantitySold: number;
}
