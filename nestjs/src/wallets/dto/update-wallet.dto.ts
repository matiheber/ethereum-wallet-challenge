import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    id: number;
    address: string;
    balance: string;
    old: boolean;
    favorite: boolean;
}
