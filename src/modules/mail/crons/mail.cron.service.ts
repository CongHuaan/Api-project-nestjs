import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../mail.service';
import { MailerProducer } from 'src/queue/producers/mailer.producer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly mailerProducer: MailerProducer,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyReport() {
    const emails = this.userRepository.find();
    (await emails).forEach(async (user) => {
      this.logger.debug('Sending daily report email');
      await this.mailerProducer.dailyMail();
    });
  }
}
