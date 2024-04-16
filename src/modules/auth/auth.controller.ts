import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthDto } from '@modules/auth/auth.dto';
import { AuthService } from '@modules/auth/auth.service';
import { Public } from './decorator/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  async signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
}
