import { IsNumber, IsUUID } from "class-validator";

export class CreateDailyProductDTO {
	@IsUUID("4", { message: "productId precisa ser um UUID v4" })
	productId: string;

	@IsNumber({}, { message: "quantity precisa ser um number" })
	quantity: number;
}
