import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class UpdateDailyProductDTO {
	@IsUUID("4", { message: "id precisa ser um UUID v4" })
	@IsOptional()
	id: string;

	@IsUUID("4", { message: "productId precisa ser um UUID v4" })
	@IsOptional()
	productId: string;

	@IsNumber({}, { message: "quantity precisa ser um number" })
	@IsOptional()
	quantity: number;
}
