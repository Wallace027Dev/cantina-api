import type { Cache } from "cache-manager";
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	UseInterceptors,
} from "@nestjs/common";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserService } from "./user.service";
import { listUserDTO } from "./dto/ListUser.dto";
import { UserEntity } from "./user.entity";
import { HashPasswordPipe } from "../../resources/pipes/hash-password.pipe";

@Controller("/users")
export class UserController {
	constructor(
		private userService: UserService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllUsers() {
		const usersList = await this.userService.getAllUsers();

		return usersList.map((user) => {
			return new listUserDTO(user.id, user.name, user.role);
		});
	}

	@Get("/:id")
	async getUserWithSales(@Param("id") id: string) {
		let user = await this.cacheManager.get<UserEntity>(id);

		if (!user) {
			user = await this.userService.getUserWithSales(id);

			await this.cacheManager.set(id, user);
		}

		return {
			message: "Usuário encontrado com sucesso",
			user: new listUserDTO(user.id, user.name, user.role, user.sales),
		};
	}

	@Post()
	async createUser(
		@Body("password", HashPasswordPipe) hashedPassword: string,
		@Body() userData: CreateUserDTO,
	) {
		const newUser = await this.userService.createUser({
			...userData,
			password: hashedPassword,
		});

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
