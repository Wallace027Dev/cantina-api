import { Module } from "@nestjs/common";
import { DailyProductController } from "./daily-product.controller";
import { DailyProductRepository } from "./daily-product.repository";

@Module({
  controllers: [DailyProductController],
  providers: [DailyProductRepository],
})
export class DailyProductModule {}
