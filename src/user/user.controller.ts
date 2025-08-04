import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { listUserDTO } from "./dto/ListUser.dto";

@Controller("/users")
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getAllUsers() {
    const usersSaved = await this.userRepository.list();
    const usersList = usersSaved.map(
      (user) => new listUserDTO(user.id, user.name),
    );
    return usersList;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.role = userData.role;
    userEntity.id = uuid();
    userEntity.createdAt = new Date();

    await this.userRepository.save(userEntity);
    return {
      user: new listUserDTO(userEntity.id, userEntity.name),
      message: "Usuário criado com sucesso",
    };
  }
}
