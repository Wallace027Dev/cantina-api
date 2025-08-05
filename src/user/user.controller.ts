import { v4 as uuid } from "uuid";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import { listUserDTO } from "./dto/ListUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";

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
			message: "Usuário criado com sucesso",
			user: new listUserDTO(
				userEntity.id,
				userEntity.name,
				userEntity.role,
				userEntity.sales,
				userEntity.createdAt,
				userEntity.updatedAt,
				userEntity.deletedAt,
			),
		};
	}

	@Put("/:id")
	async updateUser(@Param("id") id: string, @Body() userData: UpdateUserDTO) {
		const updatedUser = await this.userRepository.update(id, userData);

		return {
			message: "Usuário atualizado com sucesso",
			user: new listUserDTO(
				updatedUser.id,
				updatedUser.name,
				updatedUser.role,
				updatedUser.sales,
				updatedUser.createdAt,
				updatedUser.updatedAt,
				updatedUser.deletedAt,
			),
		};
	}
}
