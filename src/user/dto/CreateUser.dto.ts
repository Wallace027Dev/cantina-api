import { IsEnum, MinLength } from "class-validator";
import { NameIsUnique } from "../validation/name-is-unique.validator";

export class CreateUserDTO {
	@MinLength(3, { message: "Nome precisa ter pelo menos 3 caracteres" })
	@NameIsUnique({ message: "Já existe um usuário com esse nome" })
	name: string;

	@MinLength(6, { message: "Senha precisa ter pelo menos 6 caracteres" })
	password: string;

	@IsEnum(["employee", "admin"], {
		message: "Role precisa ser 'employee' ou 'admin'",
	})
	role: "employee" | "admin";
}
