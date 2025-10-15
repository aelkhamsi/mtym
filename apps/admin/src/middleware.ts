import { NextRequest, NextResponse } from "next/server"

const PROTECTED_ROUTES = ['/home']

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
    const [name, value] = nameValue.trim().split('=')
    if (name && value) cookies[name] = value
  }
  return cookies
}

export async function middleware(req: NextRequest) {
  const maintenanceMode = false
  if (maintenanceMode) {
    req.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(req.nextUrl)
  }

  const pathname = req.nextUrl.pathname
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  const accessToken = req.cookies.get('access_token')?.value
  const refreshToken = req.cookies.get('refresh_token')?.value  
  const isValidToken = (token?: string) => token && validateToken(token)
  const redirectToHome = () => {
    const res = NextResponse.redirect(new URL('/login', req.url))
    res.cookies.delete('access_token')
    res.cookies.delete('refresh_token')
    return res
  }

  if (!isValidToken(accessToken)) {
    if (!isValidToken(refreshToken)) {
      if (isProtected) return redirectToHome()
      return NextResponse.next()
    }

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
      if (isProtected) return redirectToHome()
      return NextResponse.next()
    }
    
    const cookies = extractCookies(refreshRes)
    const response = NextResponse.next()
    response.cookies.set('access_token', cookies.access_token, {
      httpOnly: true,
      maxAge: 60 * 60,
    })
    return response
  }

  if (pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
}