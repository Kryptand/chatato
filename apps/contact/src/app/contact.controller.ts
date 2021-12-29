import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAllForUser(
    @Query('userId') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<any> {
    return this.contactService.findAllForUser(userId, { page, limit });
  }
  @Get('/:id')
  findOne(@Request() req): Promise<any> {
    return this.contactService.findOne(req.params.id);
  }
  @Post()
  createOne(@Request() req): Promise<any> {
    return this.contactService.create(req.body);
  }
  @Put('/:id')
  update(@Request() req): Promise<any> {
    return this.contactService.update(req.params.id, req.body);
  }
  @Delete('/:id')
  delete(@Request() req): Promise<any> {
    return this.contactService.delete(req.params.id);
  }
}
