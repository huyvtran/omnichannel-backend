import { Module } from "@nestjs/common";

//MODULE
import { AuthModule } from "./auth/auth.module";
import { InteractionModule } from "./interaction/interaction.module";
import { IncomingModule } from "./incoming/incoming.module";
import { OutgoingModule } from "./outgoing/outgoing.module";
import { AutoInModule } from "./autoin/autoin.module";
import { CustomerModule } from "./customer/customer.module";
import { InternalChatModule } from "./internalChat/internalChat.module";
import { MasterDataModule } from "./masterData/masterData.module";
import { ReportModule } from "./report/report.module";
@Module({
  imports: [
    AuthModule,
    InteractionModule,
    IncomingModule,
    OutgoingModule,
    CustomerModule,
    AutoInModule,
    MasterDataModule,
    InternalChatModule,
    ReportModule,
  ],
})
export class ApplicationModule {}
