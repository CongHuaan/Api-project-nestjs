import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@entity/user.entity';
import { AuthDto } from './auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signIn(dto: AuthDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatch = await argon.verify(user.password, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    console.log({
      dto,
    });
    return this.signInToken(user.id, user.email);
  }

  async signUp(dto: AuthDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new ForbiddenException('Credentials taken');
    }

    const hash = await argon.hash(dto.password);
    const newUser = this.userRepository.create({
      email: dto.email,
      password: hash,
    });
    await this.userRepository.save(newUser);
    console.log({
      newUser,
    });
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
