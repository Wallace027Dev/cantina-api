import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			transformOptions: { enableImplicitConversion: false },
		}),
	);
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(process.env.API_PORT ?? 3000);
}

bootstrap();
