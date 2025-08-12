/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConfigService } from "@nestjs/config";
import { Injectable, PipeTransform } from "@nestjs/common";
import { hash } from "bcrypt";

@Injectable()
export class HashPasswordPipe implements PipeTransform {
	constructor(private configService: ConfigService) {}

	async transform(password: string): Promise<string> {
		const saltRounds = this.configService.get("SALT_PASSWORD") || 10;
		return await hash(password, saltRounds);
	}
}
