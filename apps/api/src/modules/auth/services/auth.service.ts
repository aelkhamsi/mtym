import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { hashPassword, comparePasswords } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminUserService } from 'src/modules/admin-user/services/admin-user.service';
import { ADMIN_ROLE, USER_ROLE } from 'src/constants';
import { MailService } from 'src/modules/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user || !comparePasswords(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: USER_ROLE,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      verified: user?.verified,
      statusCode: 200,
    };
  }

  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = hashPassword(password);
    return this.userService.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
  }

  async loginAdmin(username: string, password: string) {
    const user = await this.adminUserService.findOneByUsername(username);
    if (!user || !comparePasswords(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user?.id,
      username: user?.username,
      role: ADMIN_ROLE,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      statusCode: 200,
    };
  }

  async signupAdmin(username: string, password: string) {
    const user = await this.adminUserService.findOneByUsername(username);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = hashPassword(password);
    return this.adminUserService.create({
      username,
      password: passwordHash,
    });
  }

  async resetPassword(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const payload = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: USER_ROLE,
    };
    const token = await this.jwtService.signAsync(payload);
    await this.mailService.sendResetPasswordEmail(user, token);
  }

  async sendEmailVerificationCode(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const verificationCode = await uuidv4().slice(-6);
    this.userService.updateEmaiVerificationCode(user?.id, verificationCode);

    await this.mailService.sendEmailVerificationEmail(user, verificationCode);
  }

  async checkEmailVerificationCode(email: string, verificationCode: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const userVerificationCode = user?.verificationCode;
    if (userVerificationCode != verificationCode) {
      throw new ForbiddenException();
    }

    await this.userService.updateVerifiedStatus(user?.id, true);
  }
}
