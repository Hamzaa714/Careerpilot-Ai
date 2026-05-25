import { NextResponse } from "next/server";
import { aiComplete } from "@/lib/openai";
import { requireUserAndCredit } from "@/lib/ai-guard";

export async function POST(req: Request) {
    const { mode, role, skills, about } = await req.json();
    const feature = mode === "about" ? "LINKEDIN_ABOUT" : "LINKEDIN_HEADLINE";
    const guard = await requireUserAndCredit(feature);
    if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });

    let prompt = "";
    if (mode === "headline") {
        prompt = `Write 3 LinkedIn headline options (under 220 chars) for a ${role} based in Pakistan with skills: ${(skills || []).join(", ")}. Return each on a new line.`;
    } else if (mode === "about") {
        prompt = `Write a LinkedIn About section (3 short paragraphs, first person) for a ${role}. Incorporate: ${about}. Optimize for keywords.`;
    } else {
        prompt = `Suggest 12 LinkedIn skills (comma-separated) for a ${role} in Pakistan.`;
    }
    const text = await aiComplete("You are a LinkedIn branding expert.", prompt, 400);
    return NextResponse.json({ text });
}
