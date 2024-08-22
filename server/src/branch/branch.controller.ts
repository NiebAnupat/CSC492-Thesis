import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ConflictException,
  Req,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { JwtAuthGuard } from 'src/auth/common/guard/jwt-auth.guard';
import { toAny } from 'src/utils/toAny';
import { ClinicService } from 'src/clinic/clinic.service';
import { JwtUser } from 'src/auth/common/type/auth';
import { BranchHook } from './common/permission/branch.hook';
import { Roles } from 'src/auth/common/enum/role.enum';
import { EmployeeService } from 'src/employee/employee.service';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('branch')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly clinicService: ClinicService,
    private readonly employeeService: EmployeeService,
  ) {}

  @UseAbility(Actions.create, toAny('branch'))
  @Post()
  async create(@Body() createBranchDto: CreateBranchDto, @Req() req: any) {
    const user: JwtUser = req.user as JwtUser;
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
    return this.branchService.create({
      user_id: user.id,
      clinic_id,
      data: createBranchDto,
    });
  }

  @UseAbility(Actions.read, toAny('branch'), BranchHook)
  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @UseAbility(Actions.read, toAny('branch'), BranchHook)
  @Get('/clinic')
  async findBranchesByClinic(@Req() req: any) {
    const user: JwtUser = req.user as JwtUser;

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
        const { branch} = await this.employeeService.findOne({
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
