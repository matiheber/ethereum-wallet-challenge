import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WalletsApiController } from './wallets-api.controller';
import { WalletsApiService } from './wallets-api.service';

@Module({
    imports: [HttpModule],
    providers: [WalletsApiService],
    controllers: [WalletsApiController],
    exports: [WalletsApiService],
})
export class WalletsApiModule {}
