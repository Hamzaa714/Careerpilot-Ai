import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for") || "anon";
    const rl = rateLimit(`register:${ip}`, 5, 60_000);
    if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const body = await req.json().catch(() => null);
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

    const hash = await bcrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
        data: { name: parsed.data.name, email: parsed.data.email, password: hash, subscription: { create: {} } },
        select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ user });
}
