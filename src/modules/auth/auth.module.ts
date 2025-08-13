import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get<string>("JWT_SECRET"),
					signOptions: { expiresIn: "72h" },
				};
			},
			inject: [ConfigService],
			global: true,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
