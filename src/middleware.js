import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
  const token = await getToken({ req, secret })
  const { pathname } = req.nextUrl

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (pathname.startsWith('/dashboard/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard/user', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
