import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './auth/decorators';

@ApiTags('1 - Public')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  @Public()
  @ApiOperation({
    description: 'API call to check if the server is alive.'
  })
  @ApiOkResponse({
    description: 'The server is alive'
  })
  getHealthCheck() {
    return this.appService.getHealthCheck();
  }
}
