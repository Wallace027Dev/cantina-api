import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDTO } from "./dto/authenticate.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	login(@Body() { name, password }: AuthenticateDTO) {
		return this.authService.login(name, password);
	}
}
