import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RestService } from './rest.service';

@ApiTags('Health')
@Controller('rest')
export class RestController {
  constructor(private restService: RestService) {}

  @Get('/health')
  @ApiOkResponse({ description: 'Service Healthy' })
  restHealthCheck() {
    return this.restService.getHealth();
  }
}
