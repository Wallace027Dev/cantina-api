import { EventDayEntity } from "src/event-day/event-day.entity";
import { ProductEntity } from "src/product/product.entity";
import { SaleEntity } from "src/sale/sale.entity";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("daily_products")
export class DailyProductEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => ProductEntity, (product) => product.dailyProducts)
	product: ProductEntity;

	@ManyToOne(() => EventDayEntity, (day) => day.products)
	day: EventDayEntity;

	@Column({ type: "int" })
	quantity: number;

	@OneToMany(() => SaleEntity, (sale) => sale.dailyProduct)
	sales: SaleEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
