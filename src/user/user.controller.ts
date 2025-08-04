import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Controller("/users")
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getAllUsers() {
    return await this.userRepository.list();
  }

  @Post()
  async createUser(@Body() userData: { name: string; email: string }) {
    return await this.userRepository.save(userData);
  }
}
