"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function SummaryToolPage() {
    const [out, setOut] = useState("");
    const [loading, setLoading] = useState(false);
    async function run(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const data = {
            personal: { fullName: fd.get("name"), title: fd.get("role") },
            skills: String(fd.get("skills") || "").split(",").map((s) => s.trim()),
            experience: [{ role: fd.get("role"), company: fd.get("company") }],
        };
        const res = await fetch("/api/ai/summary", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) });
        setLoading(false);
        const j = await res.json();
        setOut(j.text || "");
    }
    return (
        <div className="space-y-6">
            <div><h1 className="text-3xl font-bold tracking-tight">AI Summary Generator</h1><p className="text-sm text-muted-foreground">Craft a powerful resume summary instantly.</p></div>
            <Card className="p-5">
                <form onSubmit={run} className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1"><Label>Name</Label><Input name="name" required /></div>
                    <div className="space-y-1"><Label>Role</Label><Input name="role" required placeholder="Frontend Engineer" /></div>
                    <div className="space-y-1"><Label>Latest company</Label><Input name="company" /></div>
                    <div className="space-y-1"><Label>Top skills (comma)</Label><Input name="skills" placeholder="React, TypeScript" /></div>
                    <div className="sm:col-span-2"><Button variant="gradient" className="w-full" disabled={loading}><Sparkles className="mr-1 h-4 w-4" />{loading ? "Generating…" : "Generate Summary"}</Button></div>
                </form>
            </Card>
            {out && <Card className="p-5"><Textarea rows={6} value={out} onChange={(e) => setOut(e.target.value)} /></Card>}
        </div>
    );
}
