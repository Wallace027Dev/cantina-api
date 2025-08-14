import { Matches } from "class-validator";
import { SaleEntity } from "../sale/sale.entity";
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	OneToMany,
} from "typeorm";

export enum Role {
	ADMIN = "ADMIN",
	VENDOR = "VENDOR",
}

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		name: "name",
		type: "varchar",
		length: 100,
		unique: true,
	})
	name: string;

	@Column({ name: "password", type: "varchar", length: 100, nullable: false })
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{8,30}$/, {
		message:
			"A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres",
	})
	password: string;

	@Column({ name: "role", type: "enum", enum: Role, default: Role.VENDOR })
	role: Role;

	@OneToMany(() => SaleEntity, (sale) => sale.user)
	sales: SaleEntity[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", nullable: true })
	updatedAt?: Date | null;

	@DeleteDateColumn({ name: "deleted_at", nullable: true })
	deletedAt?: Date | null;
}
