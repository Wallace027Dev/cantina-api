import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class UpdateEventDayDTO {
	@Type(() => Date)
	@IsDate({ message: "Date must be a date" })
	@IsOptional()
	date: Date;
}
