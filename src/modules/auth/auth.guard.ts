import { Request } from "express";
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "./auth.service";

export interface RequisitionWithUser extends Request {
	user: UserPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requisition = context
			.switchToHttp()
			.getRequest<RequisitionWithUser>();
		const token = this.extractTokenFromHeader(requisition);

		if (!token) {
			throw new UnauthorizedException("Erro de autenticação.");
		}

		try {
			const payload: UserPayload = await this.jwtService.verifyAsync(token);
			requisition.user = payload;
		} catch (error: unknown) {
			console.error(error);

			throw new UnauthorizedException("Erro de autenticação.");
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
