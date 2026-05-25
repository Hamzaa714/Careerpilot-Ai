"use client";
import { useState, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createResume } from "../actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function createResumeAction(_prev: string | null, formData: FormData): Promise<string | null> {
    try {
        await createResume(formData);
        return null;
    } catch (e: any) {
        // redirect() throws internally — rethrow it so Next.js handles it
        if (e?.digest?.startsWith("NEXT_REDIRECT")) throw e;
        return e?.message ?? "Failed to create resume";
    }
}

const TEMPLATES = [
    { id: "MODERN", label: "Modern", desc: "Clean left-accent bar, colored skill tags", color: "#6366f1" },
    { id: "CORPORATE", label: "Corporate", desc: "Solid header band, two-column layout", color: "#1e3a5f" },
    { id: "MINIMAL", label: "Minimal", desc: "Ultra-clean, centered, wide whitespace", color: "#374151" },
    { id: "GOVERNMENT", label: "Government", desc: "Formal structure, all-caps headings", color: "#047857" },
    { id: "CREATIVE", label: "Creative", desc: "Gradient header, timeline experience", color: "#ec4899" },
];

export default function NewResumePage() {
    const [selected, setSelected] = useState("MODERN");
    const [error, formAction, pending] = useActionState(createResumeAction, null);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Create a new resume</h1>
            <p className="mt-1 text-sm text-muted-foreground">Choose a template and give it a name to get started.</p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {TEMPLATES.map((t) => (
                    <button key={t.id} type="button" onClick={() => setSelected(t.id)}
                        className={`rounded-xl border-2 p-4 text-left transition hover:shadow-md ${selected === t.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-md" : "border-border bg-card hover:border-indigo-300"}`}>
                        {/* Mini template preview */}
                        <div className="mb-3 h-20 w-full overflow-hidden rounded-lg border border-slate-200" style={{}}>
                            {t.id === "MODERN" && (
                                <div className="flex h-full w-full bg-white">
                                    <div className="w-1 h-full" style={{ backgroundColor: t.color }} />
                                    <div className="flex-1 p-2 space-y-1">
                                        <div className="h-2 w-2/3 rounded" style={{ backgroundColor: t.color + "22" }} />
                                        <div className="h-1.5 w-1/2 rounded bg-slate-200" />
                                        <div className="mt-2 h-1 w-full rounded bg-slate-100" />
                                        <div className="h-1 w-5/6 rounded bg-slate-100" />
                                    </div>
                                </div>
                            )}
                            {t.id === "CORPORATE" && (
                                <div className="flex flex-col h-full bg-white">
                                    <div className="h-7 w-full px-2 flex items-center" style={{ backgroundColor: t.color }}>
                                        <div className="h-1.5 w-2/3 rounded bg-white opacity-80" />
                                    </div>
                                    <div className="flex flex-1 p-1.5 gap-1.5">
                                        <div className="flex-[2] space-y-1"><div className="h-1 w-full rounded bg-slate-100" /><div className="h-1 w-5/6 rounded bg-slate-100" /></div>
                                        <div className="flex-1 space-y-1"><div className="h-1 w-full rounded bg-slate-200" /><div className="h-1 w-4/5 rounded bg-slate-200" /></div>
                                    </div>
                                </div>
                            )}
                            {t.id === "MINIMAL" && (
                                <div className="flex flex-col items-center h-full bg-white p-2 gap-1">
                                    <div className="h-2 w-2/3 rounded" style={{ backgroundColor: t.color + "33" }} />
                                    <div className="h-px w-full bg-slate-200" />
                                    <div className="h-1 w-full rounded bg-slate-100" />
                                    <div className="h-1 w-5/6 rounded bg-slate-100" />
                                    <div className="h-1 w-4/5 rounded bg-slate-100" />
                                </div>
                            )}
                            {t.id === "GOVERNMENT" && (
                                <div className="flex flex-col items-center h-full bg-white p-2 gap-1">
                                    <div className="h-2 w-1/2 rounded bg-slate-300" />
                                    <div className="h-px w-full" style={{ backgroundColor: t.color }} />
                                    <div className="h-1 w-full rounded bg-slate-100" />
                                    <div className="h-1 w-5/6 rounded bg-slate-100" />
                                    <div className="h-px w-full" style={{ backgroundColor: t.color + "55" }} />
                                    <div className="h-1 w-full rounded bg-slate-100" />
                                </div>
                            )}
                            {t.id === "CREATIVE" && (
                                <div className="flex flex-col h-full bg-white overflow-hidden">
                                    <div className="h-8 w-full px-2 flex items-center" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)` }}>
                                        <div className="h-1.5 w-1/2 rounded bg-white opacity-80" />
                                    </div>
                                    <div className="flex flex-1 p-1.5 gap-1.5">
                                        <div className="flex-[3] space-y-1"><div className="h-1 w-full rounded bg-slate-100" /><div className="h-1 w-5/6 rounded bg-slate-100" /></div>
                                        <div className="flex-[2] space-y-1"><div className="h-1 w-full rounded bg-slate-200" /><div className="h-1 w-3/4 rounded bg-slate-200" /></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{t.label}</span>
                            {selected === t.id && <Badge variant="outline" className="text-[10px]">Selected</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                    </button>
                ))}
            </div>

            <Card className="mt-6 p-6">
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="template" value={selected} />
                    <div className="space-y-1">
                        <Label>Resume title</Label>
                        <Input name="title" placeholder="e.g. Frontend Engineer Resume" required />
                    </div>
                    <Button variant="gradient" className="w-full" disabled={pending}>
                        {pending ? "Creating…" : "Create resume"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

