import { PartialType } from "@nestjs/mapped-types";
import { CreateDailyProductDTO } from "./CreateDailyProduct.dto";

export class UpdateDailyProductDTO extends PartialType(CreateDailyProductDTO) {}
