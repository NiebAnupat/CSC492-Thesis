import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { GoogleOauthGuard } from "./utils/guard/google-oauth.guard";
import { customer } from "@prisma/client";
import { DateTime } from "luxon";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "./utils/guard/jwt-auth.guard";

@Controller("auth/google")
export class GoogleOauthController {
  constructor(private jwtService: JwtService) {
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get("callback")
  // @UseGuards(JwtAuthGuard)
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // For now, we'll just show the user object

    // const { accessToken, customer } = req.user as GooglePassportResponse;
    const customer = req.user as customer;
    const jwtPayload = {
      customer_id: customer.customer_id,
      email: customer.email,
      provider: customer.customer_provider
    };
    const accessToken = this.jwtService.sign(jwtPayload);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: DateTime.now().plus({ days: 30 }).toJSDate()
    });
    res.send(req.user).end();
  }
}
