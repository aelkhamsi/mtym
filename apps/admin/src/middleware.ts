import { NextRequest, NextResponse } from "next/server"

const ACCESS_COOKIE = 'admin_access_token'
const REFRESH_COOKIE = 'admin_refresh_token'

/**
 * Unexpired *and* actually an admin token. The candidate session lives on the
 * same parent domain, so a token that merely parses is not proof of anything.
 */
const validateToken = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now && payload.role === 'admin';
  } catch {
    return false;
  }
}

const extractCookies = (res: Response): Record<string, string> => {
  const setCookie = res.headers.get('set-cookie')
  if (!setCookie) return {}

  const rawCookies = setCookie.split(/,(?=\s*\w+=)/)
  const cookies: Record<string, string> = {}
  for (const raw of rawCookies) {
    const [nameValue] = raw.split(';')
    const [name, ...rest] = nameValue.trim().split('=')
    const value = rest.join('=')
    if (name && value) cookies[name] = value
  }
  return cookies
}

const handleAuthenticatedUser = (req: NextRequest, pathname: string) => {
  if (pathname.startsWith('/home')) return NextResponse.next()
  return NextResponse.redirect(new URL('/home', req.url))
}

const handleUnauthenticatedUser = (req: NextRequest, pathname: string) => {
  if (pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  const res = NextResponse.redirect(new URL('/login', req.url))
  res.cookies.delete(ACCESS_COOKIE)
  res.cookies.delete(REFRESH_COOKIE)
  return res
}

export async function middleware(req: NextRequest) {
  const maintenanceMode = false
  if (maintenanceMode) {
    req.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(req.nextUrl)
  }
  
  const pathname = req.nextUrl.pathname
  const accessToken = req.cookies.get(ACCESS_COOKIE)?.value
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value
  const isValidToken = (token?: string) => token && validateToken(token)

  if (isValidToken(accessToken)) {
    return handleAuthenticatedUser(req, pathname)
  }

  if (isValidToken(refreshToken)) {
    const refreshUrl = process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/refresh/admin';
    const refreshRes = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-context': 'admin',
        'cookie': `${REFRESH_COOKIE}=${refreshToken}`
      },
      cache: "no-store"
    })

    if (!refreshRes?.ok) {
      return handleUnauthenticatedUser(req, pathname)
    }

    const cookies = extractCookies(refreshRes)
    if (!cookies[ACCESS_COOKIE]) {
      return handleUnauthenticatedUser(req, pathname)
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('cookie', `${ACCESS_COOKIE}=${cookies[ACCESS_COOKIE]}`);
    const response = pathname.startsWith('/home')
      ? NextResponse.next({ request: { headers: requestHeaders } })
      : NextResponse.redirect(new URL('/home', req.url))
    response.cookies.set(ACCESS_COOKIE, cookies[ACCESS_COOKIE], {
      httpOnly: true,
      maxAge: 60 * 60,
      domain: process.env.NEXT_PUBLIC_ENV === 'production' ? '.mathmaroc.org' : undefined,
      secure: process.env.NEXT_PUBLIC_ENV === 'production',
      sameSite: process.env.NEXT_PUBLIC_ENV === 'production' ? 'none' : 'lax',
    })
    return response
  }

  return handleUnauthenticatedUser(req, pathname)
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
}