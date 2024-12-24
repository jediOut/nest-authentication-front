import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    await jwtVerify(token, new TextEncoder().encode(secret)); 
    return NextResponse.next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: ['/protected/:path*'],
};
