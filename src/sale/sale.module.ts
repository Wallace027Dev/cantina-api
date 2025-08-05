import { Module } from "@nestjs/common";
import { SaleController } from "./sale.controller";
import { SaleRepository } from "./sale.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleEntity } from "./sale.entity";
import { SaleService } from "./sale.service";

@Module({
	imports: [TypeOrmModule.forFeature([SaleEntity])],
	controllers: [SaleController],
	providers: [SaleRepository, SaleService],
})
export class SaleModule {}
