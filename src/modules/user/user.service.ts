import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, 
  ) {}

  async findAll(): Promise<User[]> {
    const cachedUser = await this.cacheManager.get<User[]>('users');
    console.log(cachedUser);
    if(cachedUser) {
      console.log('Data from Cache!');
      return cachedUser;
    }
    console.log('Database');
    const users = await this.userRepository.find();
    await this.cacheManager.set('users', users , 0);
    return users;
  }
}