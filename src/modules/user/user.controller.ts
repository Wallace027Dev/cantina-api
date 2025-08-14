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
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { listUserDTO } from "./dto/ListUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { HashPasswordPipe } from "../../resources/pipes/hash-password.pipe";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "src/resources/decorators/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("/users")
export class UserController {
	constructor(
		private readonly userService: UserService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllUsers() {
		const users = await this.userService.getAllUsers();
		await this.cacheManager.set("users", users);

		return {
			message: "Usuários encontrados com sucesso",
			users: users.map(
				(user) => new listUserDTO(user.id, user.name, user.role),
			),
		};
	}

	@UseGuards(AuthGuard)
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

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Post()
	async createUser(
		@Body("password", HashPasswordPipe) hashedPassword: string,
		@Body() userData: CreateUserDTO,
	) {
		const newUser = await this.userService.createUser({
			...userData,
			password: hashedPassword,
		});

		await this.cacheManager.del("users");

		return {
			message: "Usuário criado com sucesso",
			user: new listUserDTO(newUser.id, newUser.name, newUser.role),
		};
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Put("/:id")
	async updateUser(@Param("id") id: string, @Body() userData: UpdateUserDTO) {
		const updatedUser = await this.userService.updateUser(id, userData);

		await Promise.all([
			this.cacheManager.del(id),
			this.cacheManager.del("users"),
		]);

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

	@UseGuards(AuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		const deletedUser = await this.userService.deleteUser(id);

		await Promise.all([
			this.cacheManager.del(id),
			this.cacheManager.del("users"),
		]);

		return {
			message: "Usuário deletado com sucesso",
			user: deletedUser.name,
		};
	}
}
