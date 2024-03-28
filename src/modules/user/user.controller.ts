import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@guard/auth.guard';
import { GetUser } from '@decorator/get-user.decorator';
import { User } from '@entity/user.entity';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  getMe(@GetUser('') user: User) {
    return {
      user,
    };
  }
}
