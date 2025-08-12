import { compare } from "bcrypt";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";

interface UserPayload {
	sub: string;
	userName: string;
	role: string;
}

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async login(name: string, password: string) {
		const user = await this.userService.searchByName(name);
		if (user === null) {
			throw new NotFoundException("Usuário não encontrado.");
		}

		const userAuthenticated = await compare(password, user.password);
		if (!userAuthenticated) {
			throw new UnauthorizedException("Usuário ou senha incorretos.");
		}

		const payload: UserPayload = {
			sub: user.id,
			userName: user.name,
			role: user.role,
		};

		return {
			token_access: await this.jwtService.signAsync(payload),
		};
	}
}
