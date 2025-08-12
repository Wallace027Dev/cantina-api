import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDayDTO } from "./CreateEventDay.dto";

export class UpdateEventDayDTO extends PartialType(CreateEventDayDTO) {}
