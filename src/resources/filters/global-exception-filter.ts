import {
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ArgumentsHost } from "@nestjs/common/interfaces";
import { Request, Response } from "express";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(private adapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost) {
		console.log(exception);

		const { httpAdapter } = this.adapterHost;

		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const requisition = context.getRequest<Request>();

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
