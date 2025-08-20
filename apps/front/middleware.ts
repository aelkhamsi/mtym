import { NextRequest, NextResponse } from "next/server"

function validateToken(token: string) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

export function middleware(req: NextRequest) {
  const isInMaintenanceMode = false
  if (isInMaintenanceMode) {
    req.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(req.nextUrl)
  }

  const token = req.cookies.get('access_token')?.value

  if (!token) {
    req.cookies.delete('access_token')
    return NextResponse.redirect(new URL('/', req.url))
  }
 
  const isValid = validateToken(token);
  if (!isValid) return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next(); 
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile/:path*', '/application/:path*', '/team/:path*'],
}