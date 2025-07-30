import { Test, TestingModule } from '@nestjs/testing';
import { AuteService } from './auth.service';

describe('AuteService', () => {
  let service: AuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuteService],
    }).compile();

    service = module.get<AuteService>(AuteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
