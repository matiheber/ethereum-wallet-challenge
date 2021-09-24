import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, } from 'rxjs/operators';




@Injectable()
export class WalletsApiService {

  constructor(
    private httpService: HttpService,
    ){}



  async findOne(address: string) {
    return this.httpService.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`)
    .pipe(
      map(response => response.data)
    )
  }

  isOld(address: string) {
    return this.httpService.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&page=1&sort=asc&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`)
    .pipe(
      map(response => response.data)
    )
  }

  getEthPrice(){
    return this.httpService.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY`)
    .pipe(
      map(response => response.data)
    )
  }

  getEuroFee(){
      return this.httpService.get(`http://api.exchangeratesapi.io/v1/latest?access_key=4cc70a1e6a903343d647a4ffa9faec76&symbols=USD`)
      .pipe(
          map(response => response.data)
      )
  }
}
