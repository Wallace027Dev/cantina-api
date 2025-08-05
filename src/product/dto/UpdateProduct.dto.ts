import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { DailyProductEntity } from "src/daily-product/daily-product.entity";
import { CreateProductDTO } from "./CreateProduct.dto";

export class UpdateProductDTO {
	@IsString({ message: "Name must be a string" })
	@MinLength(3, { message: "Name must be at least 3 characters long" })
	@IsOptional()
	name: string;

	@IsNumber({}, { message: "Price must be a number" })
	@IsOptional()
	price: number;

	@Type(() => CreateProductDTO)
	@IsOptional()
	dailyProducts: DailyProductEntity[];
}
