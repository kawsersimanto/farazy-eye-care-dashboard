import { IRole } from "@/features/user/user.interface";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export interface DecodedToken {
  id: string;
  email: string;
  role: IRole;
  iat: number;
  exp: number;
}

// Routes accessible by all authenticated roles
const COMMON_ROUTES = [
  "/profile",
  "/settings",
  "/change-password",
  "/notifications",
];

// Role-specific protected routes
const ROLE_PROTECTED_ROUTES: Record<IRole, string[]> = {
  [IRole.SUPER_ADMIN]: [], // SUPER_ADMIN can access all routes
  [IRole.ADMIN]: ["/admin", "/dashboard"],
  [IRole.EMPLOYEE]: ["/employee", "/employee/dashboard"],
  [IRole.DOCTOR]: ["/doctor", "/doctor/dashboard", "/patients"],
  [IRole.PATIENT]: ["/patient", "/appointments", "/medical-records"],
};

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/unauthorized",
];

function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}

function isTokenExpired(token: DecodedToken): boolean {
  return Date.now() >= token.exp * 1000;
}

function hasRouteAccess(userRole: IRole, pathname: string): boolean {
  // SUPER_ADMIN has access to all routes
  if (userRole === IRole.SUPER_ADMIN) {
    return true;
  }

  // Check if route is in common routes (accessible by all roles)
  if (COMMON_ROUTES.some((route) => pathname.startsWith(route))) {
    return true;
  }

  // Check role-specific routes
  const allowedRoutes = ROLE_PROTECTED_ROUTES[userRole];
  return allowedRoutes.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // ---- Allow public routes ----
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && !isTokenExpired(decoded)) {
        // Redirect authenticated users away from auth pages
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  // ---- Check authentication for protected routes ----
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ---- Check token expiration ----
  if (isTokenExpired(decoded)) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // ---- Role-based access control ----
  if (!hasRouteAccess(decoded.role, pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
