import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { $Enums, customer } from '@prisma/client';
import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { GoogleOauthGuard } from './common/guard/google-oauth.guard';

@ApiTags('Google Oauth')
@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtService: JwtService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('callback')
  // @UseGuards(JwtAuthGuard)
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const customer = req.user as customer;
    const jwtPayload = {
      customer_id: customer.customer_uid,
      email: customer.email,
      provider: customer.provider,
      role: $Enums.roles.owner,
    };
    const accessToken = this.jwtService.sign(jwtPayload);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: DateTime.now().plus({ days: 30 }).toJSDate(),
    });
    res.end();
  }
}
