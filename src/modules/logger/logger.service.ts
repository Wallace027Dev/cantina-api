import { Injectable, ConsoleLogger } from "@nestjs/common";

@Injectable()
export class CustomLogger extends ConsoleLogger {
	constructor() {
		super("CustomLogger");
	}
	formataLog(name: string, value: number) {
		return `LOCAL: ${this.context} - NOME: ${name} - PREÇO: ${value} - TIMESTAMP ${this.getTimestamp()}`;
	}
}
