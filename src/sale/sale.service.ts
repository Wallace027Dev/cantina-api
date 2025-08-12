import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleEntity } from "./sale.entity";
import { Repository } from "typeorm";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { DailyProductService } from "src/daily-product/daily-product.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class SaleService {
	constructor(
		@InjectRepository(SaleEntity)
		private readonly saleRepository: Repository<SaleEntity>,
		private readonly dailyProductService: DailyProductService,
		private readonly userService: UserService,
	) {}

	async getAllSales() {
		return await this.saleRepository.find({
			relations: ["user", "dailyProduct", "dailyProduct.product"],
			select: {
				id: true,
				quantitySold: true,
				createdAt: true,
				user: {
					id: true,
					name: true,
				},
				dailyProduct: {
					id: true,
					product: {
						id: true,
						name: true,
						price: true,
					},
				},
			},
		});
	}

	async createSale(data: CreateSaleDTO) {
		// Verifica se o produto do dia existe e se tem quantidade suficiente
		const dailyProduct = await this.dailyProductService.searchDailyProductById(
			data.dailyProductId,
		);
		if (dailyProduct.quantity < data.quantitySold) {
			throw new BadRequestException("Quantidade insuficiente em estoque");
		}

		// Verifica se o usuário existe
		const user = await this.userService.getUserById(data.userId);
		if (!user) {
			throw new NotFoundException("Usuário não encontrado");
		}

		// Atualiza estoque
		dailyProduct.quantity -= data.quantitySold;
		await this.dailyProductService.updateDailyProduct(
			dailyProduct.id,
			dailyProduct,
		);

		// Cria a venda
		const saleEntity = new SaleEntity();
		saleEntity.user = user;
		saleEntity.dailyProduct = dailyProduct;
		saleEntity.quantitySold = data.quantitySold;

		const createdSale = await this.saleRepository.save(saleEntity);

		return createdSale;
	}
}
