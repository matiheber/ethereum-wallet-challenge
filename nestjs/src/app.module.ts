import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { WalletsModule } from './wallets/wallets.module';
import { WalletsService } from './wallets/wallets.service';
import { WalletsController } from './wallets/wallets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletsApiModule } from './wallets-api/wallets-api.module';

@Module({
  imports: [
    HttpModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'digital_wallet',
      autoLoadModels: true,
      synchronize: true,
    }),
    WalletsModule,
    WalletsApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
