import { Injectable } from "@nestjs/common";
import { IUserBase } from "src/interfaces/IUser";

@Injectable()
export class UserRepository {
  private usuarios: IUserBase[] = [];

  async save(user: IUserBase) {
    this.usuarios.push(user);
    console.log(this.usuarios);
    return user;
  }

  async list() {
    return this.usuarios;
  }
}
