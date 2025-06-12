// middleware.js
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// Secret harus sama dengan yang ada di .env
const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
  const token = await getToken({ req, secret })
  const { pathname } = req.nextUrl

  // ✅ Blok akses ke /dashboard jika belum login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // ✅ (Opsional) Batasi akses ke /dashboard/admin hanya untuk role admin
  if (pathname.startsWith('/dashboard/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard/user', req.url))
  }

  return NextResponse.next()
}

// Aktifkan middleware hanya untuk path tertentu
export const config = {
  matcher: ['/dashboard/:path*'],
}
