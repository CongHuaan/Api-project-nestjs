import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid or missing authorization header',
      );
    }

    const token = authHeader.split(' ')[1].trim();
    try {
      const decoded = jwt.verify(token, this.config.get('JWT_SECRET'));
      request.user = decoded; // Lưu thông tin người dùng vào request cho các route handler sau này có thể truy cập
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}