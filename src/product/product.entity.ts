import { DailyProductEntity } from "src/daily-product/daily-product.entity";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({ name: "products" })
export class ProductEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "name", length: 100, unique: true })
	name: string;

	@Column({
		name: "price",
		type: "decimal",
		precision: 10,
		scale: 2,
	})
	price: number;

	@OneToMany(() => DailyProductEntity, (dp) => dp.product)
	dailyProducts: DailyProductEntity[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", nullable: true })
	updatedAt?: Date | null;

	@DeleteDateColumn({ name: "deleted_at", nullable: true })
	deletedAt?: Date | null;
}
