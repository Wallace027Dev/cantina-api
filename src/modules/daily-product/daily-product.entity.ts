import { EventDayEntity } from "../event-day/event-day.entity";
import { ProductEntity } from "../product/product.entity";
import { SaleEntity } from "../sale/sale.entity";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("daily_products")
export class DailyProductEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => ProductEntity, (product) => product.dailyProducts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "product_id" })
	product: ProductEntity;

	@ManyToOne(() => EventDayEntity, (day) => day.products, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "event_day_id" })
	day: EventDayEntity;

	@Column({ name: "quantity", type: "int", nullable: false })
	quantity: number;

	@OneToMany(() => SaleEntity, (sale) => sale.dailyProduct)
	sales: SaleEntity[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", nullable: true })
	updatedAt?: Date | null;

	@DeleteDateColumn({ name: "deleted_at", nullable: true })
	deletedAt?: Date | null;
}
