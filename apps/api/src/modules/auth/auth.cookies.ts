/**
 * The front app (mtym.mathmaroc.org) and the admin dashboard
 * (mtym-admin.mathmaroc.org) are separate subdomains, but the API that issues
 * their cookies lives on a third host — so it can only scope cookies to the
 * shared parent, `.mathmaroc.org`. A browser therefore carries both sessions at
 * once, and the two must not share cookie names or they overwrite each other.
 */

export const USER_COOKIES = {
  access: 'access_token',
  refresh: 'refresh_token',
} as const;

export const ADMIN_COOKIES = {
  access: 'admin_access_token',
  refresh: 'admin_refresh_token',
} as const;

/**
 * Set by the admin dashboard on every request so the JWT strategy knows which
 * of the two cookies to read. This is a selector, not a security control — the
 * token it points at is still signature- and role-checked.
 */
export const AUTH_CONTEXT_HEADER = 'x-auth-context';
export const ADMIN_AUTH_CONTEXT = 'admin';

export type AuthCookies = typeof USER_COOKIES | typeof ADMIN_COOKIES;

/** Which cookie pair a request is talking about, per the selector header. */
export const cookiesForRequest = (req: any): AuthCookies =>
  req?.headers?.[AUTH_CONTEXT_HEADER] === ADMIN_AUTH_CONTEXT
    ? ADMIN_COOKIES
    : USER_COOKIES;

export const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 1000;
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const isProduction = () => process.env.NODE_ENV === 'production';

export const cookieOptions = (maxAge?: number) => ({
  httpOnly: true,
  secure: isProduction(),
  sameSite: isProduction() ? 'None' : 'Lax',
  domain: isProduction()
    ? process.env.COOKIE_DOMAIN || '.mathmaroc.org'
    : undefined,
  ...(maxAge ? { maxAge } : {}),
});

export const setAuthCookies = (
  res: any,
  cookies: AuthCookies,
  tokens: { accessToken: string; refreshToken?: string },
) => {
  res.cookie(
    cookies.access,
    tokens.accessToken,
    cookieOptions(ACCESS_TOKEN_MAX_AGE),
  );
  if (tokens.refreshToken) {
    res.cookie(
      cookies.refresh,
      tokens.refreshToken,
      cookieOptions(REFRESH_TOKEN_MAX_AGE),
    );
  }
};

export const clearAuthCookies = (res: any, cookies: AuthCookies) => {
  res.clearCookie(cookies.access, cookieOptions());
  res.clearCookie(cookies.refresh, cookieOptions());
};
