import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { ProductService } from "./product.service";
import { CustomLoggerModule } from "../logger/logger.module";

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity]), CustomLoggerModule],
	controllers: [ProductController],
	providers: [ProductService],
	exports: [ProductService],
})
export class ProductModule {}
