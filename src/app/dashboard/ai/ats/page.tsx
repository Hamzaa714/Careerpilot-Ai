"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AtsPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    async function run(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const res = await fetch("/api/ai/ats", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: fd.get("resume"), jobDescription: fd.get("jd") })
        });
        setLoading(false);
        const j = await res.json();
        if (!res.ok) return toast.error(j.error || "Failed");
        setResult(j);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">ATS Analyzer</h1>
                <p className="text-sm text-muted-foreground">Score your resume against any job description.</p>
            </div>
            <Card className="p-5">
                <form onSubmit={run} className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1"><Label>Resume text</Label><Textarea name="resume" rows={12} required /></div>
                    <div className="space-y-1"><Label>Job description</Label><Textarea name="jd" rows={12} required /></div>
                    <div className="md:col-span-2"><Button variant="gradient" className="w-full" disabled={loading}><Sparkles className="mr-1 h-4 w-4" />{loading ? "Analyzing…" : "Analyze"}</Button></div>
                </form>
            </Card>

            {result && (
                <Card className="p-6">
                    <div className="flex items-center justify-between"><div className="text-sm uppercase tracking-wider text-muted-foreground">Match score</div><Badge variant={result.score >= 75 ? "success" : "secondary"}>{result.score}%</Badge></div>
                    <Progress value={result.score || 0} className="mt-3" />
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div><div className="font-semibold text-emerald-500">Matched</div><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{(result.matched || []).map((k: string, i: number) => <li key={i}>• {k}</li>)}</ul></div>
                        <div><div className="font-semibold text-red-500">Missing</div><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{(result.missing || []).map((k: string, i: number) => <li key={i}>• {k}</li>)}</ul></div>
                        <div><div className="font-semibold text-fuchsia-500">Suggestions</div><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{(result.suggestions || []).map((k: string, i: number) => <li key={i}>• {k}</li>)}</ul></div>
                    </div>
                </Card>
            )}
        </div>
    );
}
