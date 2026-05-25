import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAuthPage = ["/login", "/register", "/forgot-password"].some((p) =>
        nextUrl.pathname.startsWith(p),
    );
    const isProtected =
        nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/admin");

    if (isAuthPage && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    if (isProtected && !isLoggedIn) {
        return NextResponse.redirect(new URL(`/login?from=${nextUrl.pathname}`, nextUrl));
    }
    if (nextUrl.pathname.startsWith("/admin") && req.auth?.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
