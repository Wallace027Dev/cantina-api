import { IsEnum, IsOptional, MinLength } from "class-validator";
import { NameIsUnique } from "../validation/name-is-unique.validator";
import { SaleEntity } from "src/sale/sale.entity";
import { CreateDailyProductDTO } from "src/daily-product/dto/DailyProduct.dto";
import { Type } from "class-transformer";

export class UpdateUserDTO {
	@MinLength(3, { message: "Nome precisa ter pelo menos 3 caracteres" })
	@NameIsUnique({ message: "Já existe um usuário com esse nome" })
	@IsOptional()
	name: string;

	@MinLength(6, { message: "Senha precisa ter pelo menos 6 caracteres" })
	@IsOptional()
	password: string;

	@IsEnum(["employee", "admin"], {
		message: "Role precisa ser 'employee' ou 'admin'",
	})
	@IsOptional()
	role: "employee" | "admin";

	@Type(() => CreateDailyProductDTO)
	@IsOptional()
	sale: SaleEntity[];
}
