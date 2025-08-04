import { Module } from "@nestjs/common";
import { SaleController } from "./sale.controller";
import { SaleRepository } from "./sale.repository";

@Module({
	controllers: [SaleController],
	providers: [SaleRepository],
})
export class SaleModule {}
