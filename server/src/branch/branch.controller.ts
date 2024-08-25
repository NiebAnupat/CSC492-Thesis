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
    // let owner_id: string;
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
    if (!clinic_id) return new ConflictException('Clinic not found');
    createBranchDto.branch_display_id =
      await this.uniqueIdService.generateBranchDisplayId(clinic_id);
    const newBranch = await this.branchService.create({
      user_id: user.id,
      clinic_id,
      data: createBranchDto,
    });
    const { person_information_id } = await this.customerService.findOne({
      customer_id: user.id,
    });

    const employee_id = await this.uniqueIdService.generateEmployeeId(
      clinic_id,
      newBranch.branch_id,
    );

    const employee = await this.employeeService.create({
      clinic_id,
      branch_id: newBranch.branch_id,
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
    await this.branchService.update(newBranch.branch_id, {
      branch_manager: {
        connect: { employee_uid: employee.employee_uid },
      },
      edit_by: employee.employee_uid,
    });

    return this.branchService.findOne({ branch_id: newBranch.branch_id });
  }

  @UseAbility(Actions.create, toAny('branch'))
  @Post('/generateEmployeeAuthUrl')
  async generateEmployeeAuthUrl(@Body() data: { branch_id: number }) {
    // TODO : Can generate url for only owner or manager of the branch
    const url = await this.authService.generateBranchEmployeeAuthUrl(
      data.branch_id,
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
  async findBranchesByClinic(@Req() req: any , @User() user) {

    switch (user.roles[0]) {
      case Roles.developer:
        return { owner_id: 'TestID' };
      case Roles.owner: {
        const clinic = await this.clinicService.findOne({ owner_id: user.id });
        if (!clinic) return new NotFoundException('Clinic not found');
        const branchs = await this.branchService.findBranchesByClinic(
          clinic.clinic_id,
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
  @Get(':branch_id')
  async findOne(
    @Param('branch_id', new DefaultValuePipe(0), ParseIntPipe)
    branch_id: number,
  ) {
    const branch = await this.branchService.findOne({ branch_id });
    if (!branch) return new NotFoundException('Branch not found');
    return branch;
  }

  @UseAbility(Actions.update, toAny('branch'), BranchHook)
  @Patch(':branch_id')
  update(
    @Param('branch_id', new DefaultValuePipe(0), ParseIntPipe)
    branch_id: number,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchService.update(branch_id, updateBranchDto);
  }

  @UseAbility(Actions.delete, toAny('branch'), BranchHook)
  @Delete(':branch_id')
  async remove(@Param('branch_id', new ParseIntPipe()) branch_id: number) {
    const clinic = await this.branchService.findOne({ branch_id });
    if (!clinic) return new ConflictException('Branch not found');
    const branch_deleted = await this.branchService.remove({ branch_id });
    if (!branch_deleted) return new ConflictException('Branch not deleted');
    return { message: `Branch ID ${branch_id} is deleted (soft)` };
  }
}
