import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";
import { CreateUserDTO } from "./dto/CreateUser.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async getAllUsers(): Promise<UserEntity[]> {
		return this.userRepository.find();
	}

	async getUserById(id: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: { id },
			select: { id: true, name: true, role: true },
		});

		if (!user) throw new NotFoundException("Usuário não encontrado.");
		return user;
	}

	async getUserWithSales(id: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ["sales"],
		});

		if (!user) throw new NotFoundException("Usuário não encontrado.");
		return user;
	}

	async searchByName(name: string): Promise<UserEntity | null> {
		return this.userRepository.findOne({ where: { name } });
	}

	async createUser(data: CreateUserDTO): Promise<UserEntity> {
		const userEntity = this.userRepository.create({
			...data,
			sales: [],
		});

		return this.userRepository.save(userEntity);
	}

	async updateUser(
		id: string,
		dataForUpdate: UpdateUserDTO,
	): Promise<UserEntity> {
		const user = await this.getUserById(id);
		Object.assign(user, dataForUpdate);

		return this.userRepository.save(user);
	}

	async deleteUser(id: string): Promise<UserEntity> {
		const user = await this.getUserById(id);
		await this.userRepository.delete(id);

		return user;
	}
}
