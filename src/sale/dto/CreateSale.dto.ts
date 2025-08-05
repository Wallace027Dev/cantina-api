import { IsNumber, IsUUID } from "class-validator";

export class CreateSaleDTO {
	@IsUUID("4", { message: "userId precisa ser um UUID v4" })
	userId: string;

	@IsUUID("4", { message: "dailyProductId precisa ser um UUID v4" })
	dailyProductId: string;

	@IsNumber({}, { message: "quantitySold precisa ser um number" })
	quantitySold: number;
}
