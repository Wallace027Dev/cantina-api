import { SaleEntity } from "src/sale/sale.entity";
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	OneToMany,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@Column()
	password: string;

	@Column({ default: "VENDOR" })
	role: "ADMIN" | "VENDOR";

	@OneToMany(() => SaleEntity, (sale) => sale.user)
	sales: SaleEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
