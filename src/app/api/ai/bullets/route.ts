import { NextResponse } from "next/server";
import { aiComplete } from "@/lib/openai";
import { requireUserAndCredit } from "@/lib/ai-guard";

export async function POST(req: Request) {
    const guard = await requireUserAndCredit("BULLET");
    if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const { role, company, current } = await req.json();
    const prompt = `Rewrite/expand bullet points for a resume role.
Role: ${role}
Company: ${company}
Existing bullets:
${(current || []).join("\n")}

Rules:
- Output 4-6 strong bullets
- Use action verbs (Led, Built, Shipped, Optimized, Automated)
- Include metrics where reasonable (%, $, users)
- One sentence each, under 25 words
- Return only bullets, one per line, no numbering`;
    const text = await aiComplete("You are a senior resume writer.", prompt, 450);
    const bullets = text.split("\n").map((b) => b.replace(/^[-*•\d.\s]+/, "").trim()).filter(Boolean).slice(0, 6);
    return NextResponse.json({ bullets });
}
