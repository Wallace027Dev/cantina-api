import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleEntity } from "./sale.entity";
import { Repository } from "typeorm";

@Injectable()
export class SaleService {
	constructor(
		@InjectRepository(SaleEntity)
		private readonly saleRepository: Repository<SaleEntity>,
	) {}

	async getAllSales(): Promise<SaleEntity[]> {
		return await this.saleRepository.find();
	}

	async createSale(sale: SaleEntity): Promise<SaleEntity> {
		return await this.saleRepository.save(sale);
	}

	async updateSale(id: string, dataForUpdate: Partial<SaleEntity>) {
		await this.saleRepository.update(id, dataForUpdate);
	}

	async deleteSale(id: string) {
		await this.saleRepository.delete(id);
	}
}
