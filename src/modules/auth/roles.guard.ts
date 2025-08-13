import { Reflector } from "@nestjs/core";
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common";
import { RequisitionWithUser } from "./auth.guard";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<string[]>(
			"roles",
			context.getHandler(),
		);

		if (!requiredRoles || requiredRoles.length === 0) return true;

		const { user } = context.switchToHttp().getRequest<RequisitionWithUser>();

		if (!user || !requiredRoles.includes(user.role)) {
			throw new ForbiddenException("Token não autorizado");
		}

		return true;
	}
}
