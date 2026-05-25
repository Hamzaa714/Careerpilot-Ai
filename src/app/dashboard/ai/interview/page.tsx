"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

type QA = { q: string; a: string };

export default function InterviewPage() {
    const [list, setList] = useState<QA[]>([]);
    const [loading, setLoading] = useState(false);

    async function generate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const res = await fetch("/api/ai/interview", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: fd.get("role"), category: fd.get("category"), count: Number(fd.get("count") || 8) })
        });
        setLoading(false);
        const j = await res.json();
        if (!res.ok) return toast.error(j.error || "Failed");
        setList(j.questions || []);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Interview Preparation</h1>
                <p className="text-sm text-muted-foreground">Practice technical, HR & behavioral interviews.</p>
            </div>
            <Card className="p-5">
                <form onSubmit={generate} className="grid gap-3 sm:grid-cols-4">
                    <div className="space-y-1 sm:col-span-2"><Label>Role</Label><Input name="role" required placeholder="Backend Engineer" /></div>
                    <div className="space-y-1"><Label>Category</Label>
                        <select name="category" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                            <option value="technical">Technical</option><option value="hr">HR</option><option value="behavioral">Behavioral</option>
                        </select>
                    </div>
                    <div className="space-y-1"><Label>Questions</Label><Input name="count" type="number" min={3} max={15} defaultValue={8} /></div>
                    <div className="sm:col-span-4"><Button variant="gradient" className="w-full" disabled={loading}><Sparkles className="mr-1 h-4 w-4" />{loading ? "Generating…" : "Generate Mock Interview"}</Button></div>
                </form>
            </Card>

            <div className="space-y-3">
                {list.map((q, i) => (
                    <details key={i} className="group rounded-xl border bg-card p-4">
                        <summary className="cursor-pointer list-none font-semibold flex justify-between"><span>Q{i + 1}. {q.q}</span><span className="text-muted-foreground group-open:rotate-45">+</span></summary>
                        <p className="mt-2 text-sm text-muted-foreground">{q.a}</p>
                    </details>
                ))}
            </div>
        </div>
    );
}
