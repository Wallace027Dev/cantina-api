import { Module } from "@nestjs/common";
import { SaleController } from "./sale.controller";
import { SaleRepository } from "./sale.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleEntity } from "./sale.entity";

@Module({
	imports: [TypeOrmModule.forFeature([SaleEntity])],
	controllers: [SaleController],
	providers: [SaleRepository],
})
export class SaleModule {}
