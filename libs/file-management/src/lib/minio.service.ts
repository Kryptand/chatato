import * as Minio from 'minio';
import { Stream } from 'stream';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

function handleError(err: Error, path: string, bucket: string): Error {
  switch (err.name) {
    case 'NoSuchBucket':
      return new Error('No such Bucket at bucket:' + bucket + ' err:' + err);
    case 'NoSuchKey':
      return new Error('No such File at path:' + path + ' err:' + err);
    default:
      return err;
  }
}

async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();
    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
  });
}
export interface RawResponse {
  raw: Stream;
}
export interface ExistsResponse extends RawResponse {
  exists: boolean;
}

export interface ContentResponse<ContentType> extends RawResponse {
  content: ContentType;
}

export interface StatResponse extends RawResponse {
  size: number;
  modified: Date;
}

export interface DeleteResponse extends RawResponse {
  wasDeleted: boolean | null;
}
export abstract class AbstractExternalFileService {
  public abstract copy(src: string, dest: string): Promise<RawResponse>;

  /**
   * Delete existing file.
   */
  public abstract delete(objectName: string): Promise<DeleteResponse>;

  /**
   * Determines if a file or folder already exists.
   */
  public abstract exists(objectName: string): Promise<ExistsResponse>;

  /**
   * Returns the file contents.
   */
  public abstract get(
    objectName: string,
    encoding?: BufferEncoding
  ): Promise<ContentResponse<string>>;

  /**
   * Returns the file contents as Buffer.
   */
  public abstract getBuffer(
    objectName: string
  ): Promise<ContentResponse<Buffer>>;

  /**
   * Returns file's size and modification date.
   */
  public abstract getStat(objectName: string): Promise<StatResponse>;

  /**
   * Returns the stream for the given file.
   */
  public abstract getStream(objectName: string): Promise<any>;

  /**
   * Moves file from one location to another. This
   * method will call `copy` and `delete` under
   * the hood.
   */
  public abstract move(src: string, dest: string): Promise<RawResponse>;

  /**
   * Creates a new file.
   * This method will create missing directories on the fly.
   */
  public abstract put(
    objectName: string,
    content: Buffer | ReadableStream | string
  ): Promise<RawResponse>;
}

@Injectable()
export class MinioAdapterService extends AbstractExternalFileService {
  private isBootstrapped = false;
  constructor(
    @Inject('MINIO_CONFIG_PREFIX_KEY') private key: string,
    private config: ConfigService
  ) {
    super();
  }
  private client: Minio.Client | null = null;
  private currentBucket: string | null = null;

  onModuleInit() {
    if (!this.isBootstrapped) {
      this.bootstrapClient();
      this.isBootstrapped = true;
    }
  }

  onModuleDestroy() {
    console.debug('...shutting down');
    this.client = null;
    this.isBootstrapped = false;
  }

  bootstrapClient() {
    this.client = new Minio.Client({
      endPoint: this.config.get(this.key + '_MINIO_ENDPOINT'),
      port: parseInt(this.config.get(this.key + '_MINIO_PORT'), 10),
      useSSL: this.config.get(this.key + '_MINIO_USE_SSL') === 'true',
      accessKey: this.config.get(this.key + '_MINIO_ACCESS_KEY'),
      secretKey: this.config.get(this.key + '_MINIO_SECRET_KEY'),
    });
    this.currentBucket = this.config.get(this.key + '_MINIO_BUCKET');
  }
  public setCurrentBucket(bucketName: string) {
    if (!bucketName) {
      throw new Error('bucketName not provided!');
    }
    this.currentBucket = bucketName;
  }
  public async copy(src: string, dest: string): Promise<RawResponse> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    try {
      // @ts-ignore
      const result = await this.client.copyObject(
        dest,
        this.currentBucket,
        `/${this.currentBucket}/${src}`
      );
      return { raw: result };
    } catch (e) {
      throw handleError(e, src, this.currentBucket);
    }
  }
  /**
   * Delete existing file.
   */
  public async delete(objectName: string): Promise<DeleteResponse> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    try {
      const result = await this.client.removeObject(
        this.currentBucket,
        objectName
      );
      // Amazon does not inform the client if anything was deleted.
      return { raw: result, wasDeleted: null };
    } catch (e) {
      throw handleError(e, objectName, this.currentBucket);
    }
  }
  /**
   * Determines if a file or folder already exists.
   */
  public async exists(objectName: string): Promise<ExistsResponse> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    try {
      const result = await this.client.statObject(
        this.currentBucket,
        objectName
      );
      return { exists: true, raw: result };
    } catch (e) {
      if (e.statusCode === 404) {
        return { exists: false, raw: e };
      } else {
        throw handleError(e, objectName, this.currentBucket);
      }
    }
  }
  /**
   * Returns the file contents.
   */
  public async get(
    objectName: string,
    encoding: BufferEncoding = 'utf-8'
  ): Promise<ContentResponse<string>> {
    const bufferResult = await this.getBuffer(objectName);
    return {
      content: bufferResult.content.toString('base64'),
      raw: bufferResult.raw,
    };
  }
  /**
   * Returns the file contents as Buffer.
   */
  public async getBuffer(objectName: string): Promise<ContentResponse<Buffer>> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    try {
      const result = await this.client.getObject(
        this.currentBucket,
        objectName
      );
      // S3.getObject returns a Buffer in Node.js
      // @ts-ignore
      //const body = await stream2buffer(JSON.parse(JSON.stringify(result)));
      return { content: result, raw: result };
    } catch (e) {
      throw handleError(e, objectName, this.currentBucket);
    }
  }
  /**
   * Returns file's size and modification date.
   */
  public async getStat(objectName: string): Promise<StatResponse> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    try {
      const result = await this.client.statObject(
        this.currentBucket,
        objectName
      );
      return {
        size: result.size as number,
        modified: result.lastModified as Date,
        raw: result,
      };
    } catch (e) {
      throw handleError(e, objectName, this.currentBucket);
    }
  }
  /**
   * Returns the stream for the given file.
   */
  public async getStream(objectName: string) {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    return await this.client.getObject(this.currentBucket, objectName);
  }
  /**
   * Moves file from one location to another. This
   * method will call `copy` and `delete` under
   * the hood.
   */
  public async move(src: string, dest: string): Promise<RawResponse> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    await this.copy(src, dest);
    await this.delete(src);
    return { raw: undefined };
  }
  /**
   * Creates a new file.
   * This method will create missing directories on the fly.
   */
  public async put(
    objectName: string,
    content: Buffer | ReadableStream | string
  ): Promise<RawResponse> {
    if (!this.client) {
      throw new Error('Client is not initialized');
    }
    if (!this.currentBucket) {
      throw new Error('Current bucket is not defined');
    }
    try {
      await this.client.putObject(
        this.currentBucket,
        objectName,
        content as any
      );
      return { raw: undefined };
    } catch (e) {
      throw handleError(e, objectName, this.currentBucket);
    }
  }
}
