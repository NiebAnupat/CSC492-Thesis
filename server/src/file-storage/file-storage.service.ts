import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import { ConfigKey } from 'src/config/config.enum';
import { AWSConfig } from 'src/config/config.interface';
import { FileResponse } from './utils/types/FileRespones';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class FileStorageService {
  private awsConfig: AWSConfig;
  constructor(
    private readonly configService: ConfigService,
    @InjectS3() private readonly s3: S3,
  ) {
    if (!this.awsConfig)
      this.awsConfig = this.configService.get<AWSConfig>(ConfigKey.AWS);
  }

  uploadFile(file: MemoryStoredFile, filename: string) {
    return this.s3.putObject({
      Bucket: this.awsConfig.bucketName,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
  }

  async getFile(filename: string): Promise<FileResponse> {
    try {
      const file = await this.s3.getObject({
        Bucket: this.awsConfig.bucketName,
        Key: filename,
      });
      return {
        Metadata: {
          ContentType: file.ContentType,
          ContentLength: file.ContentLength,
        },
        Body: await file.Body.transformToByteArray(),
      };
    } catch (error) {
      throw error;
    }
  }
}
