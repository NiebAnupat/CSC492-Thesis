import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class UploadLogoDto {
  @IsFile()
  @MaxFileSize(1e6 * 5)
  @HasMimeType(['image/jpg', 'image/jpeg', 'image/png'])
  logo_file: MemoryStoredFile;
}
