import { IsEnum, IsOptional, MinLength } from "class-validator";
import { NameIsUnique } from "../validation/name-is-unique.validator";
import { SaleEntity } from "src/sale/sale.entity";
import { CreateDailyProductDTO } from "src/daily-product/dto/DailyProduct.dto";
import { Type } from "class-transformer";
import { Role } from "../user.entity";

export class UpdateUserDTO {
	@MinLength(3, { message: "Nome precisa ter pelo menos 3 caracteres" })
	@NameIsUnique({ message: "Já existe um usuário com esse nome" })
	@IsOptional()
	name: string;

	@MinLength(6, { message: "Senha precisa ter pelo menos 6 caracteres" })
	@IsOptional()
	password: string;

	@IsEnum([Role.ADMIN, Role.VENDOR], {
		message: "Role precisa ser 'VENDOR' ou 'ADMIN'",
	})
	@IsOptional()
	role: Role;

	@Type(() => CreateDailyProductDTO)
	@IsOptional()
	sale: SaleEntity[];
}
