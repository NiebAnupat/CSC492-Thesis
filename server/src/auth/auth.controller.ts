import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { DateTime } from "luxon";
import { Response } from "express";
import { LocalAuthGuard } from "./utils/guard/local-auth.guard";

@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req, @Res() res: Response) {
    const { access_token } = req.user;
    this.setAccessTokenCookie(res, access_token);
    res.status(HttpStatus.OK).send(
      {
        message: "Customer logged in successfully"
      }
    ).end();
  }


  @Post("register")
  async register(@Body() createCustomerDto: CreateCustomerDto, @Res() res: Response) {
    const { access_token } = await this.authService.customer_register(createCustomerDto);
    this.setAccessTokenCookie(res, access_token);
    res.status(HttpStatus.CREATED).send(
      {
        message: "Customer created successfully and logged in"
      }
    ).end();
  }

  private setAccessTokenCookie(res: Response, access_token: string) {
    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: DateTime.now().plus({ days: 30 }).toJSDate()
    });
  }
}
