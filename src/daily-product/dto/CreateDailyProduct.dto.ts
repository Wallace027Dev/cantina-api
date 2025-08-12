import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateDailyProductDTO {
	@IsUUID("4", { message: "productId precisa ser um UUID v4" })
	productId: string;

	@IsUUID("4", { message: "eventDayId precisa ser um UUID v4" })
	@IsOptional()
	eventDayId: string;

	@IsNumber({}, { message: "quantity precisa ser um number" })
	quantity: number;
}
