import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { NameIsUniqueValidator } from "./validation/name-is-unique.validator";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [UserService, UserRepository, NameIsUniqueValidator],
	exports: [UserService],
})
export class UserModule {}
