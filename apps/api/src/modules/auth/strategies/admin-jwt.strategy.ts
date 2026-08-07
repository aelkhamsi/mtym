import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from './role.enum';
import * as crypto from 'crypto';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'payload-jwt') {
  constructor(configService: ConfigService) {
    const rawSecret = configService.get('payload').secret;
    const derivedSecret = crypto
      .createHash('sha256')
      .update(rawSecret)
      .digest('hex')
      .slice(0, 32);

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['payload-token']
      ]),
      ignoreExpiration: false,
      secretOrKey: derivedSecret,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      role: Role.ADMIN
    };
  }
}