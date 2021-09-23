
import {  Injectable } from '@nestjs/common';
import { map, } from 'rxjs/operators';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';
import { CreateWalletDto } from './dto/create-wallet.dto';



@Injectable()
export class WalletsService {

  constructor(
    @InjectModel(Wallet) private readonly walletModel: typeof Wallet,
    ){}

  async findAll(): Promise<Wallet[]> {
   return this.walletModel.findAll()
  }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet>{
    const wallet = new Wallet();
    wallet.address = createWalletDto.address;
    wallet.balance = createWalletDto.balance;
    wallet.old = createWalletDto.old;

    // console.log(wallet);
    

    return wallet.save();
  }

  // async findOne(address: string) {
  //   return this.httpService.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`)
  //   .pipe(
  //     map(response => response.data)
  //   )
  // }

  // isOld(address: string) {
  //   return this.httpService.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&page=1&sort=asc&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`)
  //   .pipe(
  //     map(response => response.data)
  //   )
  // }

  // getEthPrice(){
  //   return this.httpService.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`)
  //   .pipe(
  //     map(response => response.data)
  //   )
  // }
}
