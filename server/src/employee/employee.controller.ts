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
  ) {}

  @UseAbility('create', toAny('employee'))
  @Post()
  async create(@Req() req: any, @Body() createEmployeeDto: CreateEmployeeDto) {
    const user: JwtUser = req.user;
    // let owner_id;
    // switch (user.roles[0]) {
    //   case Roles.developer:
    //     owner_id = 'TestID';
    //     break;
    //   case Roles.owner:
    //     owner_id = user.id;
    //     break;
    //   default:
    //     return new ConflictException('User not found');
    // }

    const clinic = await this.clinicService.findOne({ owner_id: user.id });
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
    const { clinic_id } = clinic;
    const { branch_id } = createEmployeeDto;
    const now = DateTime.now().toUTC().toString();
    return this.employeeService.create({
      clinic_id,
      branch_id,
      data: {
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
