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

@Controller('mtym-api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res, @Body() loginDto: LoginDto) {
    console.log('NODE_ENV', process.env.NODE_ENV)
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);

    const { accessToken, refreshToken } = await this.authService.login(user);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
      maxAge: 60 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/admin')
  async loginAdmin(@Res() res, @Body() loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;
    const admin = await this.authService.validateAdmin(username, password);

    const { accessToken, refreshToken } = await this.authService.loginAdmin(
      admin,
    );
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
      maxAge: 60 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Req() req, @Res() res) {
    const reqRefreshToken = req.cookies['refresh_token'];
    const { accessToken } = await this.authService.refreshToken(
      reqRefreshToken,
    );
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
      maxAge: 60 * 60 * 1000,
    });

    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh/admin')
  async refreshAdmin(@Req() req, @Res() res) {
    const reqRefreshToken = req.cookies['refresh_token'];
    const { accessToken } = await this.authService.refreshTokenAdmin(
      reqRefreshToken,
    );
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
      maxAge: 60 * 60 * 1000,
    });

    res.json({ statusCode: 200 });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('access_token', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
    });
    res.clearCookie('refresh_token', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      domain: process.env.NODE_ENV === 'production' ? '.mathmaroc.org' : undefined,
    });
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
