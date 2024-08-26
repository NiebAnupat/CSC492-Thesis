import {
  Body,
  ConflictException,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { isNull } from 'lodash';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/common/decorator/user.decorator';
import { Roles } from 'src/auth/common/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/common/guard/jwt-auth.guard';
import { ClinicService } from 'src/clinic/clinic.service';
import { CustomerService } from 'src/customer/customer.service';
import { EmployeeService } from 'src/employee/employee.service';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { hashPassword } from 'src/utils/hashPassword';
import { toAny } from 'src/utils/toAny';
import { BranchService } from './branch.service';
import { BranchHook } from './common/permission/branch.hook';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('branch')
export class BranchController {
  constructor(
    private readonly authService: AuthService,
    private readonly branchService: BranchService,
    private readonly clinicService: ClinicService,
    private readonly customerService: CustomerService,
    private readonly employeeService: EmployeeService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  @UseAbility(Actions.create, toAny('branch'))
  @Post()
  async create(
    @Body() createBranchDto: CreateBranchDto,
    @Req() req: any,
    @User() user,
  ) {
    // let owner_uid: string;
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
    if (!clinic_uid) return new ConflictException('Clinic not found');
    createBranchDto.branch_display_id =
      await this.uniqueIdService.generateBranchDisplayId(clinic_uid);
    const newBranch = await this.branchService.create({
      user_id: user.id,
      clinic_uid,
      data: createBranchDto,
    });
    const { person_information_id } = await this.customerService.findOne({
      customer_id: user.id,
    });

    const employee_id = await this.uniqueIdService.generateEmployeeId(
      clinic_uid,
      newBranch.branch_uid,
    );

    const employee = await this.employeeService.create({
      clinic_uid,
      branch_uid: newBranch.branch_uid,
      data: {
        employee_uid: await this.uniqueIdService.getUUID(),
        employee_id,
        password: await hashPassword('admin'),
        person_information: {
          connect: { person_information_id },
        },
      },
    });

    if (isNull(employee)) {
      throw new Error('1st Employee not created');
    }

    // update branch manager_id & edit_by
    await this.branchService.update(newBranch.branch_uid, {
      branch_manager: {
        connect: { employee_uid: employee.employee_uid },
      },
      edit_by: employee.employee_uid,
    });

    return this.branchService.findOne({ branch_uid: newBranch.branch_uid });
  }

  @UseAbility(Actions.create, toAny('branch'))
  @Post('/generateEmployeeAuthUrl')
  async generateEmployeeAuthUrl(@Body() data: { branch_uid: number }) {
    // TODO : Can generate url for only owner or manager of the branch
    const url = await this.authService.generateBranchEmployeeAuthUrl(
      data.branch_uid,
    );
    return { url };
  }

  @UseAbility(Actions.read, toAny('branch'), BranchHook)
  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @UseAbility(Actions.read, toAny('branch'), BranchHook)
  @Get('/clinic')
  async findBranchesByClinic(@Req() req: any, @User() user) {
    switch (user.roles[0]) {
      case Roles.developer:
        return { owner_uid: 'TestID' };
      case Roles.owner: {
        const clinic = await this.clinicService.findOne({ owner_uid: user.id });
        if (!clinic) return new NotFoundException('Clinic not found');
        const branchs = await this.branchService.findBranchesByClinic(
          clinic.clinic_uid,
        );
        return branchs;
      }
      case Roles.employee: {
        const { branch } = await this.employeeService.findOne({
          employee_uid: user.id,
        });

        return branch;
      }
      default:
        return new ConflictException('User not found');
    }
  }

  @UseAbility(Actions.read, toAny('branch'), BranchHook)
  @Get(':branch_uid')
  async findOne(
    @Param('branch_uid', new DefaultValuePipe(0), ParseIntPipe)
    branch_uid: number,
  ) {
    const branch = await this.branchService.findOne({ branch_uid });
    if (!branch) return new NotFoundException('Branch not found');
    return branch;
  }

  @UseAbility(Actions.update, toAny('branch'), BranchHook)
  @Patch(':branch_uid')
  update(
    @Param('branch_uid', new DefaultValuePipe(0), ParseIntPipe)
    branch_uid: number,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchService.update(branch_uid, updateBranchDto);
  }

  @UseAbility(Actions.delete, toAny('branch'), BranchHook)
  @Delete(':branch_uid')
  async remove(@Param('branch_uid', new ParseIntPipe()) branch_uid: number) {
    const clinic = await this.branchService.findOne({ branch_uid });
    if (!clinic) return new ConflictException('Branch not found');
    const branch_deleted = await this.branchService.remove({ branch_uid });
    if (!branch_deleted) return new ConflictException('Branch not deleted');
    return { message: `Branch ID ${branch_uid} is deleted (soft)` };
  }
}
