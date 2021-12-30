import { Injectable } from '@nestjs/common';
import { AbstractExternalFileService } from '@kryptand/file-management';
import { v4 as uuidv4 } from 'uuid';
import { SizeTextRepresentation } from '@chatato/image-processing';

@Injectable()
export class AvatarPersistorService {
  constructor(private abstractFileService: AbstractExternalFileService) {}
  async persistAvatarImage(
    userId: string,
    size: SizeTextRepresentation,
    file: any
  ) {
    const uuid = uuidv4();
    const fileName = `${userId}.${uuid}.${size}`;
    try {
      await this.abstractFileService.put(fileName, file);
    } catch (error) {
      console.debug(error);
      throw error;
    }
    return fileName;
  }
}
