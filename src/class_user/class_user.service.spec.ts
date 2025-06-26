import { Test, TestingModule } from '@nestjs/testing';
import { ClassUserService } from './class_user.service';

describe('ClassUserService', () => {
  let service: ClassUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassUserService],
    }).compile();

    service = module.get<ClassUserService>(ClassUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
