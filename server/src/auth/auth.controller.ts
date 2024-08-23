import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { DateTime } from 'luxon';
import { Response } from 'express';
import { LocalAuthGuard } from './common/guard/local-auth.guard';
import { CreateDeveloperDto } from '../developer/dto/create-developer.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './common/enum/role.enum';
import { JwtUser } from './common/type/auth';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async employee_login(
    @Req() req,
    @Res() res: Response,
  ) {
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
