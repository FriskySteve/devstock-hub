import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import prisma from "./lib/prisma";

const publicRoutes = ["/login", "/register", "/register-success"];

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (token?.email) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (!user) {
          const response = NextResponse.redirect(new URL("/login", req.url));
          response.cookies.delete("next-auth.session-token");
          response.cookies.delete("next-auth.csrf-token");
          return response;
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
      }
    }

    if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (!token) {
          return publicRoutes.some((route) => pathname.startsWith(route));
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
