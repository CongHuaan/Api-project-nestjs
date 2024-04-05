import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { AuthDto } from '@modules/auth/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerProducer } from 'src/queue/producers/mailer.producer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
    private jwt: JwtService,
    private readonly mailerProducer: MailerProducer,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const data = {to: dto.email, subject: 'Register', text: 'Bạn đã đăng ký thành công' }
    await this.mailerProducer.sendMail(data);
    await this.cacheManager.del('users');
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
