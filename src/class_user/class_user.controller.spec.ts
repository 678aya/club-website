import { Test, TestingModule } from '@nestjs/testing';
import { ClassUserController } from './class_user.controller';
import { ClassUserService } from './class_user.service';

describe('ClassUserController', () => {
  let controller: ClassUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassUserController],
      providers: [ClassUserService],
    }).compile();

    controller = module.get<ClassUserController>(ClassUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
