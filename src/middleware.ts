import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const path = req.nextUrl.pathname;
    // console.log(req.nextauth.token, req.url, path);
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/sign-in',
    },
  }
);

export const config = { matcher: ['/', '/admin',] };
