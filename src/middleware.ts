import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token,req.url);
    const path = req.nextUrl.pathname;
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    if(req.nextauth.token && (path === "/sign-in" || path === "/sign-up")){
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// export const config = { matcher: ['/', '/admin'] };
