import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CreateClinicDto {
  @IsNotEmpty()
  @IsString()
  clinic_name: string;

  @IsOptional()
  @IsString()
  clinic_description: string;

  // @IsNotEmpty()
  // @IsString()
  // owner_id: string;

  @IsFile()
  @MaxFileSize(1e6 * 5)
  @HasMimeType(['image/jpg','image/jpeg', 'image/png'])
  logo_file: MemoryStoredFile;
}
