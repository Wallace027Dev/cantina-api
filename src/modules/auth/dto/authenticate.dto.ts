import { IsString } from "class-validator";

export class AuthenticateDTO {
	@IsString({ message: "O nome informado é inválido" })
	name: string;

	@IsString({ message: "A senha informado é inválida" })
	password: string;
}
