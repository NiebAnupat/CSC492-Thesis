import { createMap, type Mapper, type MappingProfile } from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PatientDto } from '../dto/patient.dto';
import { Patient } from '../entity/patient.entity';

@Injectable()
export class PatientProfile extends AutomapperProfile {
  constructor(mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Patient, PatientDto);
    };
  }
}
