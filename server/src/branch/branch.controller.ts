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
import { JwtAuthGuard } from 'src/auth/utils/guard/jwt-auth.guard';
import { toAny } from 'src/utils/toAny';
import { GetBranchHook } from './utils/permission/hooks/branch.get.hook';
import { DeleteBranchHook } from './utils/permission/hooks/branch.delete.hook';
import { ClinicService } from 'src/clinic/clinic.service';
import { JwtUser } from 'src/auth/utils/type/auth';
import { Roles } from 'src/auth/utils/enum/role.enum';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('branch')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly clinicService: ClinicService,
  ) {}

  @UseAbility(Actions.create, toAny('branch'))
  @Post()
  async create(@Body() createBranchDto: CreateBranchDto, @Req() req: any) {
    // TODO: Test this
    const user: JwtUser = req.user as JwtUser;
    let owner_id;
    switch (user.roles[0]) {
      case Roles.developer:
        owner_id = 'TestID';
        break;
      case Roles.owner:
        owner_id = user.id;
        break;
      default:
        return new ConflictException('User not found');
    }
    const { clinic_id } = await this.clinicService.findOne({ owner_id });
    if (!clinic_id) return new ConflictException('Clinic not found');
    return this.branchService.create({ clinic_id, data: createBranchDto });
  }

  @UseAbility(Actions.read, toAny('branch'), GetBranchHook)
  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @UseAbility(Actions.read, toAny('branch'), GetBranchHook)
  @Get('/clinic')
  async findBranchesByClinic(@Req() req: any) {
    const user: JwtUser = req.user as JwtUser;
    const clinic = await this.clinicService.findOne({ owner_id: user.id });
    if (!clinic) return new NotFoundException('Clinic not found');
    const branchs = await this.branchService.findBranchesByClinic(
      clinic.clinic_id,
    );
    return branchs;
  }

  @UseAbility(Actions.read, toAny('branch'), GetBranchHook)
  @Get(':branch_id')
  async findOne(
    @Param('branch_id', new DefaultValuePipe(0), ParseIntPipe)
    branch_id: number,
  ) {
    const branch = await this.branchService.findOne({ branch_id });
    if (!branch) return new NotFoundException('Branch not found');
    return branch;
  }

  @UseAbility(Actions.update, toAny('branch'))
  @Patch(':branch_id')
  update(
    @Param('branch_id', new DefaultValuePipe(0), ParseIntPipe)
    branch_id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    // return this.branchService.update({branch_id}, updateBranchDto);
    throw new Error(`Method not implemented ${branch_id} ${updateBranchDto}`);
  }

  @UseAbility(Actions.delete, toAny('branch'), DeleteBranchHook)
  @Delete(':branch_id')
  async remove(@Param('branch_id', new ParseIntPipe()) branch_id: number) {
    const clinic = await this.branchService.findOne({ branch_id });
    if (!clinic) return new ConflictException('Branch not found');
    const branch_deleted = await this.branchService.remove({ branch_id });
    if (!branch_deleted) return new ConflictException('Branch not deleted');
    return { message: `Branch ID ${branch_id} is deleted` };
  }
}
