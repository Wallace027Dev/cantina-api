import { Request, Response } from "express";
import { Observable, tap } from "rxjs";
import {
	CallHandler,
	ConsoleLogger,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { RequisitionWithUser } from "../../../modules/auth/auth.guard";

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
	constructor(private logger: ConsoleLogger) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const contextHttp = context.switchToHttp();
		const requisition = contextHttp.getRequest<Request | RequisitionWithUser>();
		const response = contextHttp.getResponse<Response>();

		const { path, method } = requisition;
		const { statusCode } = response;
		this.logger.log(`${method} ${path}`);

		const instantPreController = Date.now();

		return next.handle().pipe(
			tap(() => {
				if ("user" in requisition) {
					this.logger.log(`Rota acessada pelo usuário ${requisition.user.sub}`);
				}

				const executionTimeFromRoute = Date.now() - instantPreController;
				this.logger.log(
					`Resposta: status ${statusCode} - ${executionTimeFromRoute}ms`,
				);
			}),
		);
	}
}
