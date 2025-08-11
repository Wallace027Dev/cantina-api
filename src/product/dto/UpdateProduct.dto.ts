import { CreateProductDTO } from "./CreateProduct.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
