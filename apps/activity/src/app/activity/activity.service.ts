import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from '../../../../avatar/src/app/avatar.entity';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly repo: Repository<Activity>
  ) {}
  async isOnline(userId: string) {
    const user = await this.repo.findOne({
      where: {
        userId,
      },
    });
    if (user && this.lessThanOneMinuteAgo(user.lastActivityAt)) {
      return true;
    }
  }
  async lastActivityAt(userId: string) {
    const user = await this.repo.findOne({
      where: {
        userId,
      },
    });
    return user.lastActivityAt;
  }
  async createInitialActivity(userId: string) {
    const activity = new Activity();
    activity.userId = userId;
    activity.lastActivityAt = new Date();
    await this.repo.save(activity);
  }
  async updateLastActivityAt(userId: string) {
    await this.repo.update({ userId }, { lastActivityAt: new Date() });
  }
  async deleteLastActivityEntry(userId: string) {
    await this.repo.delete({ userId });
  }
  lessThanOneMinuteAgo = (date) => {
    const HOUR = 1000 * 60;
    const anHourAgo = Date.now() - HOUR;

    return date > anHourAgo;
  };
}
