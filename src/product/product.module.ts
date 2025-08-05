import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity])],
	controllers: [ProductController],
	providers: [ProductRepository],
	exports: [ProductRepository],
})
export class ProductModule {}
