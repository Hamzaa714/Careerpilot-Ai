import OpenAI from "openai";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-dummy-for-build",
});

export const AI_MODEL = "gpt-4o-mini";

export async function aiComplete(system: string, user: string, max = 600): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
        return `// OPENAI_API_KEY not set — returning placeholder.\n${user.slice(0, 200)}`;
    }
    const r = await openai.chat.completions.create({
        model: AI_MODEL,
        temperature: 0.7,
        max_tokens: max,
        messages: [
            { role: "system", content: system },
            { role: "user", content: user },
        ],
    });
    return r.choices[0]?.message?.content?.trim() ?? "";
}
