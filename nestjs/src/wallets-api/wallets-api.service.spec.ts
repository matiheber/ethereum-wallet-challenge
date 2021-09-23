import { Test, TestingModule } from '@nestjs/testing';
import { WalletsApiService } from './wallets-api.service';

describe('WalletsApiService', () => {
  let service: WalletsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsApiService],
    }).compile();

    service = module.get<WalletsApiService>(WalletsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
