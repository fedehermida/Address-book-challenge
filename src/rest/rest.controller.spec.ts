import { Test, TestingModule } from '@nestjs/testing';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';

describe('RestController', () => {
  let controller: RestController;
  let service: RestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestController],
      providers: [RestService],
    }).compile();

    controller = module.get<RestController>(RestController);
    service = module.get<RestService>(RestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Health check', () => {
    it('Should return health check status', async () => {
      const result = 'service healthy';
      jest.spyOn(service, 'getHealth').mockImplementation(() => result);

      expect(await controller.restHealthCheck()).toBe(result);
    });
  });
});
