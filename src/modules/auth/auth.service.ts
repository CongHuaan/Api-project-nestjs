import { ForbiddenException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity'; // Giả sử user entity đã được định nghĩa
import { AuthDto } from './auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signIn(dto: AuthDto) {
    const userRepository = this.dataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatch = await argon.verify(user.password, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signInToken(user.id, user.email);
  }

  async signUp(dto: AuthDto) {
    const userRepository = this.dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new ForbiddenException('Credentials taken');
    }

    const hash = await argon.hash(dto.password);
    const newUser = userRepository.create({
      email: dto.email,
      password: hash,
    });
    await userRepository.save(newUser);

    return this.signInToken(newUser.id, newUser.email);
  }

  async signInToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
