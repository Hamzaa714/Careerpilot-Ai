import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authConfig } from "@/auth.config";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "USER" | "ADMIN";
            plan: "FREE" | "PREMIUM";
        } & DefaultSession["user"];
    }
}

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(creds) {
                const parsed = loginSchema.safeParse(creds);
                if (!parsed.success) return null;
                const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
                if (!user?.password) return null;
                const ok = await bcrypt.compare(parsed.data.password, user.password);
                if (!ok) return null;
                return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role, plan: user.plan } as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // First sign-in: all user fields come from authorize()
                token.id = (user as any).id;
                token.role = (user as any).role ?? "USER";
                token.plan = (user as any).plan ?? "FREE";
            } else if (!token.id && token.email) {
                // Fallback for OAuth accounts whose id wasn't set
                const db = await prisma.user.findUnique({ where: { email: token.email } });
                if (db) {
                    token.id = db.id;
                    token.role = db.role;
                    token.plan = db.plan;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = (token.role as any) ?? "USER";
                session.user.plan = (token.plan as any) ?? "FREE";
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
});
