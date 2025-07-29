import { Test, TestingModule } from '@nestjs/testing';
import { AuteController } from './aute.controller';

describe('AuteController', () => {
  let controller: AuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuteController],
    }).compile();

    controller = module.get<AuteController>(AuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
