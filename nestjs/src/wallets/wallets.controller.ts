import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './wallet.model'

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    ) {}

  @Post('/create')
  create(@Body() createWalletDto: CreateWalletDto): Promise<Wallet>{
    console.log(createWalletDto);
    
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  
  // @Get('/transaction/:address')
  // isOld(@Param('address') address: string) {
  //   return this.walletsService.isOld(address);
  // }
  
  // @Get('/price')
  // getEthPrice(){
  //   return this.walletsService.getEthPrice();
  // }


  // @Get(':address')
  // findOne(@Param('address') address: string) {
  //   return this.walletsService.findOne(address);  
  // }
  
}
