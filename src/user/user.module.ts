import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { NameIsUniqueValidator } from "./validation/name-is-unique.validator";

@Module({
	controllers: [UserController],
	providers: [UserRepository, NameIsUniqueValidator],
})
export class UserModule {}
