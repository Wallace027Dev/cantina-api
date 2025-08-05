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

@Entity("products")
export class ProductEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column("decimal")
	price: number;

	@OneToMany(() => DailyProductEntity, (dp) => dp.product)
	dailyProducts: DailyProductEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
