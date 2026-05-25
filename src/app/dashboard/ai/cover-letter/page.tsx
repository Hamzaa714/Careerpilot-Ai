"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function CoverLetterPage() {
    const [out, setOut] = useState("");
    const [loading, setLoading] = useState(false);
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const res = await fetch("/api/ai/cover-letter", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobTitle: fd.get("jobTitle"), company: fd.get("company"), jobDescription: fd.get("jd"), tone: fd.get("tone") })
        });
        setLoading(false);
        const j = await res.json();
        if (!res.ok) return toast.error(j.error || "Failed");
        setOut(j.content);
    }
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Cover Letter Generator</h1>
                <p className="text-sm text-muted-foreground">Tailored to the role in seconds.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-5">
                    <form onSubmit={onSubmit} className="space-y-3">
                        <div className="space-y-1"><Label>Job Title</Label><Input name="jobTitle" required placeholder="Frontend Engineer" /></div>
                        <div className="space-y-1"><Label>Company</Label><Input name="company" required placeholder="Systems Limited" /></div>
                        <div className="space-y-1"><Label>Job Description (optional)</Label><Textarea name="jd" rows={6} placeholder="Paste the JD…" /></div>
                        <div className="space-y-1"><Label>Tone</Label>
                            <select name="tone" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                                <option value="professional">Professional</option><option value="friendly">Friendly</option><option value="confident">Confident</option><option value="concise">Concise</option>
                            </select>
                        </div>
                        <Button variant="gradient" className="w-full" disabled={loading}><Sparkles className="mr-1 h-4 w-4" />{loading ? "Generating…" : "Generate"}</Button>
                    </form>
                </Card>
                <Card className="p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Output</div>
                    <Textarea value={out} onChange={(e) => setOut(e.target.value)} rows={20} className="mt-2" placeholder="Your AI-generated cover letter will appear here…" />
                </Card>
            </div>
        </div>
    );
}
