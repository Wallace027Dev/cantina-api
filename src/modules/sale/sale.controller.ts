import type { Cache } from "cache-manager";
import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	Post,
	Req,
	UnauthorizedException,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { CreateSaleDTO } from "./dto/CreateSale.dto";
import { SaleService } from "./sale.service";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import * as authGuard from "../auth/auth.guard";

@UseGuards(authGuard.AuthGuard)
@Controller("sales")
export class SaleController {
	constructor(
		private readonly saleService: SaleService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	private ensureAdmin(role: string) {
		if (role !== "ADMIN") {
			throw new UnauthorizedException(
				"Somente administradores podem acessar essa rota.",
			);
		}
	}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async getAllSales(@Req() req: authGuard.RequisitionWithUser) {
		this.ensureAdmin(req.user.role);

		const cacheKey = "sales:all";
		let sales = await this.cacheManager.get(cacheKey);

		if (!sales) {
			sales = await this.saleService.getAllSales();
			await this.cacheManager.set(cacheKey, sales, 60);
		}

		return {
			message: "Todas as vendas encontradas com sucesso",
			sales,
		};
	}

	@Get("user")
	async getSalesByUser(@Req() req: authGuard.RequisitionWithUser) {
		const cacheKey = `sales:user:${req.user.sub}`;
		let sales = await this.cacheManager.get(cacheKey);

		if (!sales) {
			sales = await this.saleService.getSalesByUserId(req.user.sub);
			await this.cacheManager.set(cacheKey, sales, 60);
		}

		return {
			message: `Vendas do usuário ${req.user.sub} encontradas com sucesso`,
			sales,
		};
	}

	@Get("id/:id")
	async getSalesByUserId(
		@Req() req: authGuard.RequisitionWithUser,
		@Param("id") id: string,
	) {
		this.ensureAdmin(req.user.role);

		const cacheKey = `sales:user:${id}`;
		let sales = await this.cacheManager.get(cacheKey);

		if (!sales) {
			sales = await this.saleService.getSalesByUserId(id);
			await this.cacheManager.set(cacheKey, sales, 60);
		}

		return {
			message: `Vendas do usuário ${id} encontradas com sucesso`,
			sales,
		};
	}

	@Post()
	async createSale(
		@Req() req: authGuard.RequisitionWithUser,
		@Body() saleData: CreateSaleDTO,
	) {
		const saleEntity = await this.saleService.createSale(
			req.user.sub,
			saleData,
		);

		await Promise.all([
			this.cacheManager.del("sales:all"),
			this.cacheManager.del(`sales:user:${req.user.sub}`),
		]);

		return { sale: saleEntity, message: "Venda criada com sucesso" };
	}
}
