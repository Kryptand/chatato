import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLocaleLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get('/test')
  async test() {
    return 'bla';
  }
  @Get()
  findAllForUser(
    @Query('userId') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<any> {
    return this.avatarService.findAllForUser(userId, { page, limit });
  }
  @Get('/:id')
  findOne(@Request() req): Promise<any> {
    return this.avatarService.findOne(req.params.id);
  }
  @Post('uploadImage')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    })
  )
  async uploadFile(
    @Request() req: Request,
    @Body() body,
    @UploadedFile() file
  ) {
    const { userId } = body;
    return await this.avatarService.uploadImage(userId, file);
  }
  @Post()
  createOne(@Request() req): Promise<any> {
    return this.avatarService.create(req.body);
  }
  @Put('/:id')
  update(@Request() req): Promise<any> {
    return this.avatarService.update(req.params.id, req.body);
  }
  @Delete('/:id')
  delete(@Request() req): Promise<any> {
    return this.avatarService.delete(req.params.id);
  }
}
