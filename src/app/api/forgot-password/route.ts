import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { email } = await req.json().catch(() => ({}));
    if (!email) return NextResponse.json({ ok: true });
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        const token = randomBytes(32).toString("hex");
        await prisma.passwordResetToken.create({
            data: { token, userId: user.id, expires: new Date(Date.now() + 1000 * 60 * 30) },
        });
        // TODO: send email via Resend/SES; for now log it.
        console.log(`[reset] ${process.env.NEXT_PUBLIC_APP_URL}/reset?token=${token}`);
    }
    return NextResponse.json({ ok: true });
}
