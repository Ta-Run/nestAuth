import { Body, Controller, Post, Get, Res, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { SignUpPayload } from './payload/signup.payload';
import { LoginPayload } from './payload/login.payload';
import { Response, Request } from 'express';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Post('/users/signup')
  signup(@Body() signupPayload: SignUpPayload): Promise<{ token: string }> {
    return this.apiService.signUp(signupPayload);
  }
  @Get('/users/login')
  login(
    @Body() loginPayload: LoginPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.apiService.login(loginPayload, response);
  }

  @Get('/users/me')
  profile(
    // @Body() loginPayload: LoginPayload,
    @Req() request: Request,
  ) {
    return this.apiService.getProfile(request);
  }
  @Post('/users/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.apiService.logout(response);
  }
  @Get('/random-joke')
  randomJoke() {
    return this.apiService.getrandomJoke();
  }
}
