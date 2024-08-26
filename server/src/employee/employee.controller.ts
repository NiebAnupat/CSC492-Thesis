import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { DateTime } from 'luxon';
import { AccessGuard, UseAbility } from 'nest-casl';
import { User } from 'src/auth/common/decorator/user.decorator';
import { Roles } from 'src/auth/common/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/common/guard/jwt-auth.guard';
import { ClinicService } from 'src/clinic/clinic.service';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { excludeFromList } from 'src/utils/exclude';
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
  async create(@Req() req: any, @Body() createEmployeeDto: CreateEmployeeDto, @User() user) {

    let owner_uid;

    if (user.role === Roles.owner) {
      owner_uid = user.id;
    } else {
      owner_uid = user.owner_uid;
    }

    const clinic = await this.clinicService.findOne({ owner_uid });
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
            hire_date: now,
            edit_by: user.id,
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
    res.status(HttpStatus.OK).send(excludeFromList(employees, ['password']));
  }

  @UseAbility('read', toAny('employee'))
  @Get('branch/:branch_uid')
  async findBranchEmployees(
    @Param('branch_uid', ParseUUIDPipe) branch_uid: string,
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
  ) {
    return excludeFromList(
      await this.employeeService.findBranchEmployees(branch_uid, skip, take),
      ['password'],
    );
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
