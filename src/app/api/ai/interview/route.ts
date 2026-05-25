import { NextResponse } from "next/server";
import { aiComplete } from "@/lib/openai";
import { requireUserAndCredit } from "@/lib/ai-guard";
import { interviewSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const guard = await requireUserAndCredit("INTERVIEW_QA");
    if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const body = await req.json();
    const parsed = interviewSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    const { role, category, count } = parsed.data;

    const prompt = `Generate ${count} ${category} interview questions for a ${role} role.
For each: include a 2-3 sentence model answer.
Return as JSON array: [{ "q": "...", "a": "..." }]`;
    const raw = await aiComplete("You are a senior interviewer.", prompt, 1200);
    let questions: any[] = [];
    try {
        const m = raw.match(/\[[\s\S]*\]/);
        questions = m ? JSON.parse(m[0]) : [];
    } catch { questions = []; }

    const saved = await prisma.interviewSession.create({
        data: { userId: guard.userId!, role, category, questions: questions as any },
    });
    return NextResponse.json({ id: saved.id, questions });
}
