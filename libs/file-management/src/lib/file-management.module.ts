import { Module } from '@nestjs/common';
import {
  AbstractExternalFileService,
  MinioAdapterService,
} from './minio.service';

@Module({})
export class FileManagementModule {
  public static forFeature(configPrefixKey: string) {
    console.debug('key', configPrefixKey);
    return {
      module: FileManagementModule,
      providers: [
        { provide: 'MINIO_CONFIG_PREFIX_KEY', useValue: configPrefixKey },
        { provide: AbstractExternalFileService, useClass: MinioAdapterService },
        MinioAdapterService,
      ],
      exports: [AbstractExternalFileService, MinioAdapterService],
    };
  }
}
