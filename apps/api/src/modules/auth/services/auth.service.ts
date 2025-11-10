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
import { MailService } from 'src/modules/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/modules/user/entities/user.entity';
import { AdminUser } from 'src/modules/admin-user/entities/admin-user.entity';
import { Role } from 'src/guards/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user || !comparePasswords(password, user.password)) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async validateAdmin(username: string, password: string) {
    const admin = await this.adminUserService.findOneByUsername(username);
    if (!admin || !comparePasswords(password, admin.password)) {
      throw new UnauthorizedException();
    }

    return admin;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      verified: user.verified,
      applicationId: user?.application?.id,
      teamId: user?.team?.id,
      role: Role.USER,
    };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async loginAdmin(adminUser: AdminUser) {
    const payload = {
      sub: adminUser.id,
      username: adminUser.username,
      role: Role.ADMIN,
    };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken);
      const user = await this.userService.findOneById(payload?.sub);
      if (!user) throw new Error() 
      return this.login(user);
    } catch {
      throw new UnauthorizedException();;
    }
  }

  async refreshTokenAdmin(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken);
      const adminUser = await this.adminUserService.findOneById(payload?.sub);
      if (!adminUser) throw new Error() 
      return this.loginAdmin(adminUser);
    } catch {
      throw new UnauthorizedException();;
    }
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
    const { accessToken } = await this.login(user)
    await this.mailService.sendResetPasswordEmail(user, accessToken);
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
