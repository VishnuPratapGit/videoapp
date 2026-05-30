import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/auth/signin",
  "/auth/signup",
  "/",
];

const PUBLIC_PATTERNS = [
  "/contact"
];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public routes and patterns without auth
  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PATTERNS.some((pattern) => pathname.startsWith(pattern));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/auth/signin", request.url);
  
  signInUrl.searchParams.set(
    "callbackUrl",
    request.nextUrl.pathname + request.nextUrl.search,
  );

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/((?!api|auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
