import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard)
  @Get('me')
  getMe() {
    return {
      msg: `It's me <3`,
    };
  }
}
