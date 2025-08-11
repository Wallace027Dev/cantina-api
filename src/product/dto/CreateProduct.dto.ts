import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { DailyProductEntity } from "src/daily-product/daily-product.entity";

export class CreateProductDTO {
	@IsString({ message: "Name must be a string" })
	@MinLength(3, { message: "Name must be at least 3 characters long" })
	name: string;

	@IsNumber({}, { message: "Price must be a number" })
	price: number;

	@Type(() => CreateProductDTO)
	@IsOptional()
	dailyProducts: DailyProductEntity[];
}
