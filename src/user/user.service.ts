import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { listUserDTO } from "./dto/ListUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async getAllUsers(): Promise<listUserDTO[]> {
		const users = await this.userRepository.find();
		return users.map((user) => {
			return new listUserDTO(
				user.id,
				user.name,
				user.role,
				user.sales,
				user.createdAt,
				user.updatedAt,
				user.deletedAt,
			);
		});
	}

	async getUserById(id: string) {
		return await this.userRepository.findOneBy({ id });
	}

	async createUser(user: UserEntity) {
		return await this.userRepository.save(user);
	}

	async updateUser(id: string, dataForUpdate: UpdateUserDTO) {
		await this.userRepository.update(id, dataForUpdate);
	}

	async deleteUser(id: string) {
		await this.userRepository.delete(id);
	}
}
