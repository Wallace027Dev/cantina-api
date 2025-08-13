import { Module } from "@nestjs/common";
import { CustomLogger } from "./logger.service";

@Module({
	exports: [CustomLogger],
	providers: [CustomLogger],
})
export class CustomLoggerModule {}
