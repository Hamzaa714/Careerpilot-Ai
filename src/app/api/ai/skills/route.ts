import { NextResponse } from "next/server";
import { aiComplete } from "@/lib/openai";
import { requireUserAndCredit } from "@/lib/ai-guard";

export async function POST(req: Request) {
    const guard = await requireUserAndCredit("SKILL_SUGGEST");
    if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const { data } = await req.json();
    const prompt = `Suggest 10 relevant resume skills as a comma-separated list (no descriptions).
Role: ${data?.personal?.title}
Experience: ${(data?.experience || []).map((e: any) => `${e.role}@${e.company}`).join("; ")}
Existing skills: ${(data?.skills || []).join(", ")}
Avoid duplicates.`;
    const text = await aiComplete("You are an expert technical recruiter.", prompt, 200);
    const skills = text.split(/[,\n]/).map((s) => s.replace(/^[-*•\d.\s]+/, "").trim()).filter(Boolean).slice(0, 10);
    return NextResponse.json({ skills });
}
