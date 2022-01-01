import { Controller, Get, Post, Request } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  GENERAL_ACTIVITY_TOPIC_NAME,
  INITIAL_ACTIVITY_TOPIC_NAME,
} from '@chatato/activity-producer';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get(':id/isOnline')
  async isOnline(id: string) {
    return await this.activityService.isOnline(id);
  }
  @Get(':id/lastOnline')
  async lastOnline(id: string) {
    return await this.activityService.lastActivityAt(id);
  }
  @Post()
  async create(@Request() request) {
    return await this.activityService.createInitialActivity(request.body);
  }
  @Post(':id/update')
  async update(@Request() request) {
    return await this.activityService.updateLastActivityAt(request.body);
  }
  @MessagePattern(GENERAL_ACTIVITY_TOPIC_NAME)
  async updateActivity(data: any) {
    return await this.activityService.updateLastActivityAt(data);
  }
  @MessagePattern(INITIAL_ACTIVITY_TOPIC_NAME)
  async createActivity(data: any) {
    return await this.activityService.createInitialActivity(data);
  }
}
