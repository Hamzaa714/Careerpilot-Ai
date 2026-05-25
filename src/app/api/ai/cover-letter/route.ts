import { NextResponse } from "next/server";
import { aiComplete } from "@/lib/openai";
import { requireUserAndCredit } from "@/lib/ai-guard";
import { prisma } from "@/lib/prisma";
import { coverLetterSchema } from "@/lib/validators";

export async function POST(req: Request) {
    const guard = await requireUserAndCredit("COVER_LETTER");
    if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const body = await req.json();
    const parsed = coverLetterSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    const { jobTitle, company, jobDescription, tone } = parsed.data;

    const prompt = `Write a ${tone} cover letter for a Pakistani candidate applying to ${jobTitle} at ${company}.
${jobDescription ? `Job description:\n${jobDescription}` : ""}

Rules:
- 3 short paragraphs + sign-off
- Strong opening hook
- Reference relevant achievements
- Localized for Pakistan
- No placeholders like [Your Name]`;
    const content = await aiComplete("You are an expert career coach.", prompt, 600);

    const saved = await prisma.coverLetter.create({
        data: { userId: guard.userId!, title: `${jobTitle} @ ${company}`, jobTitle, company, content },
    });
    return NextResponse.json({ id: saved.id, content });
}
