import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config — NO Prisma, NO bcrypt, NO Node.js-only imports.
 * Used only by the middleware. The full auth (with adapter + providers) is in lib/auth.ts.
 */
export const authConfig: NextAuthConfig = {
    pages: { signIn: "/login" },
    providers: [],          // providers are added in lib/auth.ts
    session: { strategy: "jwt" },
    callbacks: {
        jwt({ token, user }) {
            // On first sign-in, user object is present — persist fields into token.
            if (user) {
                token.id = (user as any).id;
                token.role = (user as any).role ?? "USER";
                token.plan = (user as any).plan ?? "FREE";
            }
            // No DB lookup here — edge runtime can't run Prisma.
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = (token.role as any) ?? "USER";
                session.user.plan = (token.plan as any) ?? "FREE";
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};
