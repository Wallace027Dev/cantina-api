import { Response } from "express";
import {
	Catch,
	ConsoleLogger,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ArgumentsHost } from "@nestjs/common/interfaces";
import { HttpAdapterHost } from "@nestjs/core";
import { RequisitionWithUser } from "../../modules/auth/auth.guard";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(
		private adapterHost: HttpAdapterHost,
		private nativeLogger: ConsoleLogger,
	) {}

	catch(exception: unknown, host: ArgumentsHost) {
		this.nativeLogger.error(exception);
		console.error(exception);

		const { httpAdapter } = this.adapterHost;

		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const requisition = context.getRequest<RequisitionWithUser>();

		if ("user" in requisition) {
			this.nativeLogger.log(
				`Rota acessada pelo usuário ${requisition.user.sub}`,
			);
		}

		const { status, body } =
			exception instanceof HttpException
				? {
						status: exception.getStatus(),
						body: exception.getResponse(),
					}
				: {
						status: HttpStatus.INTERNAL_SERVER_ERROR,
						body: {
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							timestamp: new Date().toISOString(),
							path: httpAdapter.getRequestUrl(requisition),
						},
					};

		httpAdapter.reply(response, body, status);
	}
}
