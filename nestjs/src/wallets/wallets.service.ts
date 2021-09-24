
import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';



@Injectable()
export class WalletsService {

  constructor(
    @InjectModel(Wallet) private readonly walletModel: typeof Wallet,
    ){}

  async findAll(): Promise<Wallet[]> {
   return this.walletModel.findAll()
  }

  findOne(id){
    return this.walletModel.findOne({where: {id}})
  }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet>{
    const wallet = new Wallet();
    wallet.address = createWalletDto.address;
    wallet.balance = createWalletDto.balance;
    wallet.old = createWalletDto.old;
    return wallet.save();
  }

  async update(id, newFavorite){
    let walletToModify = await this.findOne(id);
    let wallet = new Wallet();
    wallet = walletToModify;
    wallet.favorite = newFavorite;
    return wallet.save()
  }

}
