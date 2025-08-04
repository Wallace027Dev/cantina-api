import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { listUserDTO } from "./dto/ListUser.dto";

@Controller("/users")
export class UserController {
	constructor(private userRepository: UserRepository) {}

	@Get()
	async getAllUsers() {
		const usersSaved = await this.userRepository.list();
		const usersList = usersSaved.map(
			(user) =>
				new listUserDTO(
					user.id,
					user.name,
					user.role,
					user.sales,
					user.createdAt,
					user.updatedAt,
					user.deletedAt,
				),
		);
		return usersList;
	}

	@Post()
	async createUser(@Body() userData: CreateUserDTO) {
		const userEntity = new UserEntity();
		userEntity.id = uuid();
		userEntity.name = userData.name;
		userEntity.password = userData.password;
		userEntity.role = userData.role;
		userEntity.sales = [];
		userEntity.createdAt = new Date();
		userEntity.updatedAt = null;
		userEntity.deletedAt = null;

		await this.userRepository.save(userEntity);
		return {
			user: new listUserDTO(
				userEntity.id,
				userEntity.name,
				userEntity.role,
				userEntity.sales,
				userEntity.createdAt,
				userEntity.updatedAt,
				userEntity.deletedAt,
			),
			message: "Usuário criado com sucesso",
		};
	}
}
