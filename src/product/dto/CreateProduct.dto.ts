import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateProductDTO {
	@IsString({ message: "Name must be a string" })
	@MinLength(3, { message: "Name must be at least 3 characters long" })
	name: string;

	@IsNumber({}, { message: "Price must be a number" })
	price: number;
}
