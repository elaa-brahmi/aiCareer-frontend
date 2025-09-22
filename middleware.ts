import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')

  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [ '/resume-upload/:path*', '/cover-letter/:path*', '/chat/:path*', '/auth'],
}
