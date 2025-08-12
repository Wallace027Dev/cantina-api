import { DailyProductEntity } from "src/daily-product/daily-product.entity";
import { UserEntity } from "src/user/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "sales" })
export class SaleEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => UserEntity, (user) => user.sales, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "user_id" })
	user: UserEntity;

	@ManyToOne(() => DailyProductEntity, (dp) => dp.sales)
	@JoinColumn({ name: "daily_product_id" })
	dailyProduct: DailyProductEntity;

	@Column({ name: "quantity_sold", type: "int", nullable: false })
	quantitySold: number;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}
