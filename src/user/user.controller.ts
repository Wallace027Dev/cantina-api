import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";

@Controller("/users")
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getAllUsers() {
    return await this.userRepository.list();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    return await this.userRepository.save(userData);
  }
}
