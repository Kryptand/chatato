import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from './avatar.entity';
import {
  paginate,
  Pagination,
  PaginationMeta,
  PaginationOptions,
} from '@kryptand/request-extensions';
import { CreateImageJobsService } from './create-image-jobs.service';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly repo: Repository<Avatar>,
    private imageJobsService: CreateImageJobsService
  ) {}

  public async findAllForUser(
    userId: string,
    options?: PaginationOptions
  ): Promise<Pagination<Avatar, PaginationMeta>> {
    return paginate<Avatar>(this.repo, options, {
      userId: userId,
    });
  }

  public async findOne(id: string): Promise<Avatar> {
    return this.repo.findOne(id);
  }

  public async create(contact: Avatar): Promise<Avatar> {
    return this.repo.save(contact);
  }

  public async update(id: string, contact: Avatar): Promise<Avatar> {
    return this.repo.save({ ...contact, id });
  }

  public async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async uploadImage(userId, file) {
    return this.imageJobsService.putImageToMessagingService({
      userId,
      image: file,
    });
  }
}
