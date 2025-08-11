import { PartialType } from "@nestjs/mapped-types";
import { CreateSaleDTO } from "./CreateSale.dto";

export class UpdateSaleDTO extends PartialType(CreateSaleDTO) {}
