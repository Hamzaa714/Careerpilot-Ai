import { NextResponse } from "next/server";
import { aiComplete } from "@/lib/openai";
import { requireUserAndCredit } from "@/lib/ai-guard";

export async function POST(req: Request) {
    const guard = await requireUserAndCredit("SUMMARY");
    if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const { data } = await req.json();
    const prompt = `Write a 3–4 sentence professional resume summary in first person for this candidate.
Name: ${data?.personal?.fullName}
Title: ${data?.personal?.title}
Top skills: ${(data?.skills || []).slice(0, 10).join(", ")}
Latest role: ${data?.experience?.[0]?.role} at ${data?.experience?.[0]?.company}
Tone: confident, ATS-friendly. Avoid clichés like "team player".`;
    const text = await aiComplete("You are an expert Pakistani career coach writing ATS-friendly resumes.", prompt, 280);
    return NextResponse.json({ text });
}
