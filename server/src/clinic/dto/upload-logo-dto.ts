import { ApiProperty } from '@nestjs/swagger';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class UploadLogoDto {
  // add swagger decorator for file upload
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The uploaded file',
  })
  @IsFile()
  @MaxFileSize(1e6 * 5)
  @HasMimeType(['image/jpg', 'image/jpeg', 'image/png'])
  logo_file: MemoryStoredFile;
}
