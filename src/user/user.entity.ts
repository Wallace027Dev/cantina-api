export class UserEntity {
  id: string;
  name: string;
  password: string;
  role: "admin" | "employee";
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  // sales
}
