import { Test, TestingModule } from '@nestjs/testing';
import { UniqueIdService } from './unique-id.service';

describe('UniqueIdService', () => {
  let service: UniqueIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueIdService],
    }).compile();

    service = module.get<UniqueIdService>(UniqueIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
