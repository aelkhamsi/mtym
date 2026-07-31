import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/sign-up.dto';
import { LoginAdminDto } from '../dto/login-admin.dto';
import { SignupAdminDto } from '../dto/sign-up-admin.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Role } from 'src/guards/role.enum';
import {
  ADMIN_COOKIES,
  USER_COOKIES,
  clearAuthCookies,
  setAuthCookies,
} from '../auth.cookies';

@Controller('mtym-api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res, @Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);

    const tokens = await this.authService.login(user);
    setAuthCookies(res, USER_COOKIES, tokens);

    res.json({ statusCode: 200, verified: user?.verified });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/admin')
  async loginAdmin(@Res() res, @Body() loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;
    const admin = await this.authService.validateAdmin(username, password);

    const tokens = await this.authService.loginAdmin(admin);
    setAuthCookies(res, ADMIN_COOKIES, tokens);

    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Req() req, @Res() res) {
    const reqRefreshToken = req.cookies[USER_COOKIES.refresh];
    const { accessToken } = await this.authService.refreshToken(
      reqRefreshToken,
    );
    setAuthCookies(res, USER_COOKIES, { accessToken });

    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh/admin')
  async refreshAdmin(@Req() req, @Res() res) {
    const reqRefreshToken = req.cookies[ADMIN_COOKIES.refresh];
    const { accessToken } = await this.authService.refreshTokenAdmin(
      reqRefreshToken,
    );
    setAuthCookies(res, ADMIN_COOKIES, { accessToken });

    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res() res) {
    clearAuthCookies(res, USER_COOKIES);
    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout/admin')
  async logoutAdmin(@Res() res) {
    clearAuthCookies(res, ADMIN_COOKIES);
    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const { firstName, lastName, email, password } = signupDto;
    await this.authService.signup(firstName, lastName, email, password);

    return { statusCode: 200 };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Post('signup/admin')
  async signupAdmin(@Body() signupAdminDto: SignupAdminDto) {
    const { username, password } = signupAdminDto;
    await this.authService.signupAdmin(username, password);

    return { statusCode: 200 };
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }) {
    const { email } = body;
    await this.authService.resetPassword(email);

    return {
      statusCode: 200,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('send-email-verification')
  async sendEmailVerification(@Body() body: { email: string }) {
    const { email } = body;
    await this.authService.sendEmailVerificationCode(email);

    return {
      statusCode: 200,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async verifyEmail(@Body() body: { email: string; verificationCode: string }) {
    const { email, verificationCode } = body;
    await this.authService.checkEmailVerificationCode(email, verificationCode);

    return {
      statusCode: 200,
    };
  }
}
