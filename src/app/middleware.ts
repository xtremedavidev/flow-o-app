import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If you want to validate the token, you can add additional logic here.
  // Example: You can decode the token and check its expiration.

  // If token is valid, proceed to the requested page
  return NextResponse.next();
}

export const config = {
   matcher: [
    '/home/:path*',
    '/reports',
    '/settings',
    '/devices/:path*',
    '/action-center/:path*',
    '/env-compliance',
  ],
};
