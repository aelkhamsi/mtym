import { NextRequest, NextResponse } from "next/server"

const validateToken = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
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
  res.cookies.delete('access_token')
  res.cookies.delete('refresh_token')
  return res
}

export async function proxy(req: NextRequest) {
  const maintenanceMode = false
  if (maintenanceMode) {
    req.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(req.nextUrl)
  }
  
  const pathname = req.nextUrl.pathname
  const accessToken = req.cookies.get('access_token')?.value
  const refreshToken = req.cookies.get('refresh_token')?.value  
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
        'cookie': `refresh_token=${refreshToken}`
      },
      cache: "no-store"
    })

    if (!refreshRes?.ok) {
      return handleUnauthenticatedUser(req, pathname)
    }

    const cookies = extractCookies(refreshRes)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('cookie', `access_token=${cookies.access_token}`);
    const response = pathname.startsWith('/home')
      ? NextResponse.next({ request: { headers: requestHeaders } })
      : NextResponse.redirect(new URL('/home', req.url))
    response.cookies.set('access_token', cookies.access_token, {
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