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
		console.log(this.usuarios);
		return user;
	}

	async existName(name: string) {
		const possibleUser = this.usuarios.find((user) => user.name === name);

		return !!possibleUser;
	}
}
