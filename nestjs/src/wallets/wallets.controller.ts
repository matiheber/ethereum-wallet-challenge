import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './wallet.model'

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    ) {}

  @Post('/create')
  create(@Body() createWalletDto: CreateWalletDto): Promise<Wallet>{
      return this.walletsService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('favorite') favorite: boolean, updateWalletDto: UpdateWalletDto): Promise<any> {
    return this.walletsService.update(id, favorite);
  }
  
}
