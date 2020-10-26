import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//COMPONENT
import { MasterDataController } from "./masterData.controller";
import { MasterDataService } from "./masterData.service";

//ENTITY
import { mCategory } from "../../entity/m_category.entity";
import { mSubCategory } from "../../entity/m_sub_category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([mCategory, mSubCategory])],
  providers: [MasterDataService],
  controllers: [MasterDataController],
})
export class MasterDataModule {}
