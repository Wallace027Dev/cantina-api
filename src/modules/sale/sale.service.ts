import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleEntity } from "./sale.entity";
import { Repository } from "typeorm";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { DailyProductService } from "../daily-product/daily-product.service";
import { UserService } from "../user/user.service";

@Injectable()
export class SaleService {
	constructor(
		@InjectRepository(SaleEntity)
		private readonly saleRepository: Repository<SaleEntity>,
		private readonly dailyProductService: DailyProductService,
		private readonly userService: UserService,
	) {}

	private saleRelations = ["user", "dailyProduct", "dailyProduct.product"];

	private saleSelect = {
		id: true,
		quantitySold: true,
		createdAt: true,
		user: { id: true, name: true },
		dailyProduct: {
			id: true,
			product: { id: true, name: true, price: true },
		},
	};

	async getAllSales() {
		return this.saleRepository.find({
			relations: this.saleRelations,
			select: this.saleSelect,
		});
	}

	async getSalesByUserId(userId: string) {
		return this.saleRepository.find({
			where: { user: { id: userId } },
			relations: this.saleRelations.filter((r) => r !== "user"),
			select: {
				...this.saleSelect,
				user: undefined,
			},
		});
	}

	async createSale(userId: string, data: CreateSaleDTO) {
		const dailyProduct = await this.dailyProductService.searchDailyProductById(
			data.dailyProductId,
		);

		if (dailyProduct.quantity < data.quantitySold) {
			throw new BadRequestException("Quantidade insuficiente em estoque");
		}

		const user = await this.userService.getUserById(userId);
		if (!user) {
			throw new NotFoundException("Usuário não encontrado");
		}

		dailyProduct.quantity -= data.quantitySold;
		await this.dailyProductService.updateDailyProduct(
			dailyProduct.id,
			dailyProduct,
		);

		const saleEntity = this.saleRepository.create({
			user,
			dailyProduct,
			quantitySold: data.quantitySold,
		});

		return this.saleRepository.save(saleEntity);
	}
}
