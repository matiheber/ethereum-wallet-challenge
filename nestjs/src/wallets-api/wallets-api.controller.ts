import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletsApiService } from './wallets-api.service';

@Controller('walletsApi')
export class WalletsApiController {
  constructor(
    private readonly walletsApiService: WalletsApiService,
    ) {}

  @Get('/transaction/:address')
  isOld(@Param('address') address: string) {
    return this.walletsApiService.isOld(address);
  }
  
  @Get('/price')
  getEthPrice(){
    return this.walletsApiService.getEthPrice();
  }


  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.walletsApiService.findOne(address);  
  }
  
}
