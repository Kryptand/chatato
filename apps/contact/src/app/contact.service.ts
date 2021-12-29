import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  PaginationMeta,
  PaginationOptions,
} from '@kryptand/request-extensions';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>
  ) {}

  public async findAllForUser(
    userId: string,
    options?: PaginationOptions
  ): Promise<Pagination<Contact, PaginationMeta>> {
    return paginate<Contact>(this.repo, options, {
      userId: userId,
    });
  }

  public async findOne(id: string): Promise<Contact> {
    return this.repo.findOne(id);
  }

  public async create(contact: Contact): Promise<Contact> {
    return this.repo.save(contact);
  }

  public async update(id: string, contact: Contact): Promise<Contact> {
    return this.repo.save({ ...contact, id });
  }

  public async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
