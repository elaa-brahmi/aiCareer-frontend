import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  ////console.log("Middleware token:", token);


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
