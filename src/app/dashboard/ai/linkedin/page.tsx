"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function LinkedInPage() {
    const [mode, setMode] = useState<"headline" | "about" | "skills">("headline");
    const [out, setOut] = useState("");
    const [loading, setLoading] = useState(false);

    async function generate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const res = await fetch("/api/ai/linkedin", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode, role: fd.get("role"), about: fd.get("about"), skills: String(fd.get("skills") || "").split(",").map((s) => s.trim()) })
        });
        setLoading(false);
        const j = await res.json();
        if (!res.ok) return toast.error(j.error || "Failed");
        setOut(j.text);
    }
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">LinkedIn Optimizer</h1>
                <p className="text-sm text-muted-foreground">Generate headline, About, and keyword-rich skills.</p>
            </div>
            <div className="flex gap-2">
                {(["headline", "about", "skills"] as const).map((m) => (
                    <button key={m} onClick={() => setMode(m)} className={`rounded-lg px-3 py-1.5 text-xs capitalize ${mode === m ? "bg-gradient-brand text-white" : "border bg-card hover:bg-accent"}`}>{m}</button>
                ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-5">
                    <form onSubmit={generate} className="space-y-3">
                        <div className="space-y-1"><Label>Target role</Label><Input name="role" required placeholder="Senior Backend Engineer" /></div>
                        {mode === "about" && <div className="space-y-1"><Label>Quick brief</Label><Textarea name="about" rows={5} placeholder="What you do, what you’re looking for, key wins…" /></div>}
                        {mode !== "about" && <div className="space-y-1"><Label>Skills (comma separated)</Label><Input name="skills" placeholder="React, Node.js, PostgreSQL" /></div>}
                        <Button variant="gradient" className="w-full" disabled={loading}><Sparkles className="mr-1 h-4 w-4" />{loading ? "Generating…" : "Generate"}</Button>
                    </form>
                </Card>
                <Card className="p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Output</div>
                    <Textarea value={out} onChange={(e) => setOut(e.target.value)} rows={20} className="mt-2" />
                </Card>
            </div>
        </div>
    );
}
