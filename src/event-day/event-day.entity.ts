import { DailyProductEntity } from "src/daily-product/daily-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("event_days")
export class EventDayEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "date", unique: true })
	date: Date;

	@OneToMany(() => DailyProductEntity, (dp) => dp.day)
	products: DailyProductEntity[];
}
