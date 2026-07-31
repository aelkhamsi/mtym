import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ADMIN_COOKIES, cookiesForRequest } from '../auth.cookies';
import { Role } from 'src/guards/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.[cookiesForRequest(req).access],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt').secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const cookies = cookiesForRequest(req);

    /**
     * Both token kinds are signed with the same secret and both cookies reach
     * the API on every request, so a valid signature alone does not say which
     * session this is. When the token came from a cookie, its role must match
     * the cookie it arrived in — otherwise an admin token read as a user
     * session resolves to whichever user's id happens to equal the admin's.
     * Bearer tokens are exempt: the browser never sends those ambiently.
     */
    if (
      req?.cookies?.[cookies.access] &&
      payload?.role !== (cookies === ADMIN_COOKIES ? Role.ADMIN : Role.USER)
    ) {
      throw new UnauthorizedException();
    }

    let result = { id: payload.sub, role: payload.role } as any;
    if (payload?.username) {
      result = { ...result, username: payload.username };
    }
    if (payload?.email) {
      result = {
        ...result,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        verified: payload.verified,
        applicationId: payload.applicationId,
        teamId: payload.teamId
      };
    }
    return result;
  }
}
