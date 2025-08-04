import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  private usuarios: { name: string; email: string }[] = [];

  async list() {
    return this.usuarios;
  }

  async save(user: { name: string; email: string }) {
    this.usuarios.push(user);
    console.log(this.usuarios);
    return user;
  }
}
