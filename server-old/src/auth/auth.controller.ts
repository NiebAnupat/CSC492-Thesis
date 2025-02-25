import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DateTime } from 'luxon';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CreateDeveloperDto } from '../developer/dto/create-developer.dto';
import { AuthService } from './auth.service';
import { Roles } from './common/enum/role.enum';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
import { LocalAuthGuard } from './common/guard/local-auth.guard';
import { JwtUser } from './common/type/auth';
import { JwtUserDto } from './dto/JwtUserDto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the user profile',
    type: JwtUserDto,
  })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: any) {
    const user: JwtUser = req.user;
    return user;
  }

  // TODO : Implement Auth for employee & dentist
  //#region Login Section
  @UseGuards(AuthGuard(`${Roles.owner}, ${Roles.developer}`))
  @Post('/customer/login')
  async login(@Req() req, @Res() res: Response) {
    const { access_token } = req.user;
    this.setAccessTokenCookie(res, access_token);
    res
      .status(HttpStatus.OK)
      .send({
        message: 'Customer logged in successfully',
      })
      .end();
  }

  @UseGuards(AuthGuard(Roles.employee))
  @Post('/employee/login')
  async employee_login(@Req() req, @Res() res: Response) {
    const { access_token } = req.user;
    this.setAccessTokenCookie(res, access_token);
    res
      .status(HttpStatus.OK)
      .send({
        message: 'Employee logged in successfully',
      })
      .end();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/developer/login')
  async developer_login(@Req() req, @Res() res: Response) {
    const { access_token } = req.user;
    this.setAccessTokenCookie(res, access_token);
    res
      .status(HttpStatus.OK)
      .send({
        message: 'Developer logged in successfully',
      })
      .end();
  }
  //#endregion

  //#region Register Section
  @Post('/customer/register')
  async register(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() res: Response,
  ) {
    const { access_token } =
      await this.authService.customer_register(createCustomerDto);
    this.setAccessTokenCookie(res, access_token);
    res
      .status(HttpStatus.CREATED)
      .send({
        message: 'Customer created successfully and logged in',
      })
      .end();
  }

  @Post('/developer/register')
  async developer_register(
    @Body() createDeveloperDto: CreateDeveloperDto,
    @Res() res: Response,
  ) {
    const { access_token } =
      await this.authService.developer_register(createDeveloperDto);
    this.setAccessTokenCookie(res, access_token);
    res
      .status(HttpStatus.CREATED)
      .send({
        message: 'Developer created successfully and logged in',
      })
      .end();
  }
  //#endregion

  private setAccessTokenCookie(res: Response, access_token: string) {
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: DateTime.now().plus({ days: 30 }).toJSDate(),
    });
  }
}
