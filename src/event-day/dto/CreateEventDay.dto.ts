import { Type } from "class-transformer";
import {
	ArrayNotEmpty,
	IsArray,
	IsDate,
	ValidateNested,
} from "class-validator";
import { CreateDailyProductDTO } from "src/daily-product/dto/DailyProduct.dto";

export class CreateEventDayDTO {
	@Type(() => Date)
	@IsDate({ message: "Date must be a date" })
	date: Date;

	@IsArray({ message: "Products must be an array" })
	@ArrayNotEmpty({ message: "Products cannot be empty" })
	@ValidateNested({ each: true })
	@Type(() => CreateDailyProductDTO)
	products: CreateDailyProductDTO[];
}
