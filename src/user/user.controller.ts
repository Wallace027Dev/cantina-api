import { v4 as uuid } from "uuid";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { listUserDTO } from "./dto/ListUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async getAllUsers() {
		const usersList = await this.userService.getAllUsers();
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

		await this.userService.createUser(userEntity);

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
		await this.userService.updateUser(id, userData);

		return {
			message: "Usuário atualizado com sucesso",
		};
	}

	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		await this.userService.deleteUser(id);
		return {
			message: "Usuário deletado com sucesso",
			user: id,
		};
	}
}
