import { IsEnum, IsOptional, MinLength } from "class-validator";
import { NameIsUnique } from "../validation/name-is-unique.validator";
import { Role } from "../user.entity";
import { Type } from "class-transformer";
import { CreateDailyProductDTO } from "src/daily-product/dto/CreateDailyProduct.dto";
import { SaleEntity } from "src/sale/sale.entity";

export class CreateUserDTO {
	@MinLength(3, { message: "Nome precisa ter pelo menos 3 caracteres" })
	@NameIsUnique({ message: "Já existe um usuário com esse nome" })
	name: string;

	@MinLength(6, { message: "Senha precisa ter pelo menos 6 caracteres" })
	password: string;

	@IsEnum([Role.ADMIN, Role.VENDOR], {
		message: "Role precisa ser 'VENDOR' ou 'ADMIN'",
	})
	role: Role;

	@Type(() => CreateDailyProductDTO)
	@IsOptional()
	sale: SaleEntity[];
}
