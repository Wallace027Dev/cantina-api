import { Body, Controller, Get, Post } from "@nestjs/common";
import { IUserBase } from "src/interfaces/IUser";
import { UserRepository } from "./user.repository";

@Controller("/users")
export class UserController {
  constructor(private userRepository: UserRepository) {}
  
  @Post()
  async createUser(@Body() userData) {
    return await this.userRepository.save(userData as IUserBase);
  }

  @Get()
  async getAllUsers() {
    return await this.userRepository.list();
  }
}
