import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// Middleware handles if user logged in then go to home page, if not then redirect to login page
export async function middleware(req) {
  const url = req.nextUrl.clone()
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/_next/') || pathname.includes('.')) {
    // static files
    return
  }

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== '/login') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}
