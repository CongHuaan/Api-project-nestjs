import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@guard/auth.guard';
import { GetUser } from '@decorator/get-user.decorator';
import { User } from '@modules/user/entities/user.entity';
import { TransformInterceptor } from '@modules/user/interceptors/transform.interceptor';
import { UserService } from '@modules/user/user.service';
import {
  CacheInterceptor,
  CacheKey,
  CACHE_MANAGER,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  getMe(@GetUser('') user: User) {
    return {
      user,
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor, TransformInterceptor)
  async findAll(): Promise<any> {
    return this.userService.findAll();
  }
}
