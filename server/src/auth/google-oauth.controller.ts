import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleOauthGuard } from './utils/guard/google-oauth.guard';

@Controller('auth/google')
export class GoogleOauthController {
  //   constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    // For now, we'll just show the user object
    return req.user;
  }
}
