import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoInService } from "./autoin.service";
import { AutoInController } from "./autoin.controller";
// import { LibsModule } from "../../libs/libs.module";
import { User } from "../../entity/user.entity";
import { workOrder } from "../../entity/work_order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, workOrder])],
  providers: [AutoInService],
  controllers: [AutoInController]
})
export class AutoInModule {}
