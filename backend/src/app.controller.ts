import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './auth/roles/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.Admin)
  getHello(): string {
    return this.appService.getHello();
  }
}
