import { Test, TestingModule } from '@nestjs/testing';
import { WalletsApiController } from './wallets-api.controller'
import { WalletsApiService } from './wallets-api.service'

describe('WalletsApiController', () => {
  let controller: WalletsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsApiController],
      providers: [WalletsApiService],
    }).compile();

    controller = module.get<WalletsApiController>(WalletsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});