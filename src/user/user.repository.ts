import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/CreateUser.dto";

@Injectable()
export class UserRepository {
  private usuarios: CreateUserDTO[] = [];

  async list() {
    return this.usuarios;
  }

  async save(user: CreateUserDTO) {
    this.usuarios.push(user);
    console.log(this.usuarios);
    return user;
  }

  async existName(name: string) {
    const possibleUser = this.usuarios.find((user) => user.name === name);

    return !!possibleUser;
  }
}
