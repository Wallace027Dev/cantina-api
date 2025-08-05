/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
	private usuarios: UserEntity[] = [];

	async list() {
		return this.usuarios;
	}

	async save(user: UserEntity) {
		this.usuarios.push(user);
		return user;
	}

	async existName(name: string) {
		const possibleUser = this.usuarios.find((user) => user.name === name);

		return !!possibleUser;
	}

	async findById(id: string) {
		return this.usuarios.find((user) => user.id === id);
	}

	async update(id: string, dataForUpdate: Partial<UserEntity>) {
		const possibleUser = await this.findById(id);
		if (!possibleUser) throw new Error("Usuário não encontrado.");

		const updatedUser = {
			id: possibleUser.id,
			name: dataForUpdate.name ?? possibleUser.name,
			password: dataForUpdate.password ?? possibleUser.password,
			role: dataForUpdate.role ?? possibleUser.role,
			sales: dataForUpdate.sales ?? possibleUser.sales,
			createdAt: possibleUser.createdAt,
			updatedAt: new Date(),
			deletedAt: null,
		};

		return updatedUser;
	}

	async delete(id: string) {
		const possibleUser = await this.findById(id);
		if (!possibleUser) throw new Error("Usuário não encontrado.");

		this.usuarios = this.usuarios.filter((user) => user.id !== id);

		return id;
	}
}
