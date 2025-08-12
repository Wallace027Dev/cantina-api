import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserService } from "./user.service";
import { listUserDTO } from "./dto/ListUser.dto";

@Controller("/users")
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async getAllUsers() {
		const usersList = await this.userService.getAllUsers();

		return usersList.map((user) => {
			return new listUserDTO(user.id, user.name, user.role);
		});
	}

	@Get("/:id")
	async getUserWithSales(@Param("id") id: string) {
		const user = await this.userService.getUserWithSales(id);
		return new listUserDTO(user.id, user.name, user.role, user.sales);
	}

	@Post()
	async createUser(@Body() userData: CreateUserDTO) {
		const newUser = await this.userService.createUser(userData);

		return {
			message: "Usuário criado com sucesso",
			user: new listUserDTO(newUser.id, newUser.name, newUser.role),
		};
	}

	@Put("/:id")
	async updateUser(@Param("id") id: string, @Body() userData: UpdateUserDTO) {
		const updatedUser = await this.userService.updateUser(id, userData);

		return {
			message: "Usuário atualizado com sucesso",
			user: new listUserDTO(
				updatedUser.id,
				updatedUser.name,
				updatedUser.role,
				updatedUser.sales,
			),
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
