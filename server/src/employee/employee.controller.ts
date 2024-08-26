import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { DateTime } from 'luxon';
import { AccessGuard, UseAbility } from 'nest-casl';
import { Roles } from 'src/auth/common/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/common/guard/jwt-auth.guard';
import { JwtUser } from 'src/auth/common/type/auth';
import { ClinicService } from 'src/clinic/clinic.service';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { hashPassword } from 'src/utils/hashPassword';
import { toAny } from 'src/utils/toAny';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly employeeService: EmployeeService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  @UseAbility('create', toAny('employee'))
  @Post()
  async create(@Req() req: any, @Body() createEmployeeDto: CreateEmployeeDto) {
    const user: JwtUser = req.user;
    // let owner_uid;
    // switch (user.roles[0]) {
    //   case Roles.developer:
    //     owner_uid = 'TestID';
    //     break;
    //   case Roles.owner:
    //     owner_uid = user.id;
    //     break;
    //   default:
    //     return new ConflictException('User not found');
    // }

    const clinic = await this.clinicService.findOne({ owner_uid: user.id });
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
    const { clinic_uid } = clinic;
    const { branch_uid } = createEmployeeDto;
    const now = DateTime.now().toUTC().toString();
    const employee_id = await this.uniqueIdService.generateEmployeeId(
      clinic_uid,
      branch_uid,
    );
    return this.employeeService.create({
      clinic_uid,
      branch_uid,
      data: {
        employee_uid: await this.uniqueIdService.getUUID(),
        employee_id,
        password: await hashPassword(createEmployeeDto.password),
        person_information: {
          create: {
            ...createEmployeeDto.person_info,
            role: Roles.employee,
            create_at: now,
            update_at: now,
            // edit_by: user.id,
          },
        },
      },
    });
  }

  @UseAbility('read', toAny('employee'))
  @Get()
  async findAll(@Res() res: Response) {
    const employees = await this.employeeService.findAll();
    employees.length <= 0 &&
      res.status(HttpStatus.NO_CONTENT).send({
        message: 'No employees found',
      });
    res.status(HttpStatus.OK).send(employees);
  }

  @UseAbility('read', toAny('employee'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    // TODO: Implement this method
    // return this.employeeService.findOne(+id);
    throw new Error(`Method not implemented. ${id}`);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    // TODO: Implement this method

    // return this.employeeService.update(+id, updateEmployeeDto);
    throw new Error(`Method not implemented. ${id} ${updateEmployeeDto}`);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // TODO: Implement this method

    // return this.employeeService.remove(+id);
    throw new Error(`Method not implemented. ${id}`);
  }
}
