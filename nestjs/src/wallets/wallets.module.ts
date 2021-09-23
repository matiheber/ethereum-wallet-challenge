import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';


@Module({
  imports: [SequelizeModule.forFeature([Wallet])],
  providers: [WalletsService],
  controllers: [WalletsController]
})
export class WalletsModule {}
