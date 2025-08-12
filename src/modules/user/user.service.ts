import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async getAllUsers() {
		const users = await this.userRepository.find();

		return users;
	}

	async getUserById(id: string) {
		const user = await this.userRepository.findOne({
			where: { id },
			select: {
				id: true,
				name: true,
				role: true,
			},
		});

		if (user === null) {
			throw new NotFoundException("Usuário não encontrado.");
		}

		return user;
	}

	async getUserWithSales(id: string) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ["sales"],
		});

		if (user === null) {
			throw new NotFoundException("Usuário não encontrado.");
		}

		return user;
	}

	async searchByName(name: string) {
		return await this.userRepository.findOne({ where: { name } });
	}

	async createUser(data: CreateUserDTO) {
		const userEntity = new UserEntity();

		Object.assign(userEntity, {
			...data,
			sales: [],
		});

		const user = await this.userRepository.save(userEntity);

		return user;
	}

	async updateUser(id: string, dataForUpdate: UpdateUserDTO) {
		const user = await this.getUserById(id);

		Object.assign(user, dataForUpdate as UserEntity);

		await this.userRepository.save(user);

		return user;
	}

	async deleteUser(id: string) {
		await this.userRepository.delete(id);
	}
}
