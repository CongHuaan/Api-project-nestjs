import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from '@dto/auth.dto';
import { AuthService } from '@service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
}
