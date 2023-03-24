import {
  Controller,
  Post,
  Get,
  Session,
  Req,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/localGuard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  /**
   * session routing
   */
  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
