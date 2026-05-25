import { NextResponse } from "next/server";
import { aiComplete } from "@/lib/openai";
import { requireUserAndCredit } from "@/lib/ai-guard";

export async function POST(req: Request) {
    const guard = await requireUserAndCredit("ATS_ANALYSIS");
    if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const { resumeText, jobDescription } = await req.json();
    const prompt = `Analyze the following resume against the job description.
Return JSON: { "score": 0-100, "matched": [], "missing": [], "suggestions": [] }.

JOB:
${jobDescription}

RESUME:
${resumeText}`;
    const raw = await aiComplete("You are an ATS scanner expert.", prompt, 700);
    let result: any = {};
    try { const m = raw.match(/\{[\s\S]*\}/); result = m ? JSON.parse(m[0]) : { raw }; } catch { result = { raw }; }
    return NextResponse.json(result);
}
