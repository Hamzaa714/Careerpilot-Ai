"use client";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { saveResume, deleteResume, duplicateResume, toggleShare, updateResumeTemplate } from "../actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Sparkles, Copy, Trash2, Share2, Save, Plus, X, Palette } from "lucide-react";
import type { ResumeData, ResumeStyle } from "@/lib/validators";
import { ResumePreview } from "./preview";

type Props = {
    id: string;
    title: string;
    template: string;
    initial: ResumeData;
    initialScore: number;
};

const TEMPLATES = [
    { id: "MODERN", label: "Modern", desc: "Left accent bar, colored skills" },
    { id: "CORPORATE", label: "Corporate", desc: "Bold header band, two-column" },
    { id: "MINIMAL", label: "Minimal", desc: "Ultra clean, wide spacing" },
    { id: "GOVERNMENT", label: "Government", desc: "Formal all-caps headers" },
    { id: "CREATIVE", label: "Creative", desc: "Gradient header, timeline" },
];

const ACCENT_PRESETS = [
    "#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444",
    "#8b5cf6", "#06b6d4", "#84cc16", "#f97316", "#ec4899",
    "#1e3a5f", "#374151", "#047857", "#9a3412", "#6b21a8",
];

const FONTS = [
    { id: "inter", label: "Inter (Modern)" },
    { id: "georgia", label: "Georgia (Classic)" },
    { id: "roboto", label: "Roboto (Clean)" },
    { id: "merriweather", label: "Merriweather (Elegant)" },
    { id: "playfair", label: "Playfair (Luxury)" },
];

export function ResumeEditor({ id, title: t0, template: t0Template, initial, initialScore }: Props) {
    const [title, setTitle] = useState(t0);
    const [template, setTemplate] = useState(t0Template);
    const [data, setData] = useState<ResumeData>(initial);
    const [atsScore, setAtsScore] = useState(initialScore);
    const [tab, setTab] = useState<"personal" | "summary" | "experience" | "education" | "skills" | "projects" | "more" | "design">("personal");
    const [pending, start] = useTransition();
    const [aiLoading, setAiLoading] = useState<string | null>(null);

    const style: ResumeStyle = data.style ?? { accentColor: "#6366f1", fontFamily: "inter", layout: "classic" };

    function update<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
        setData((d) => ({ ...d, [key]: value }));
    }

    function updateStyle(patch: Partial<ResumeStyle>) {
        setData((d) => ({ ...d, style: { ...(d.style ?? { accentColor: "#6366f1", fontFamily: "inter", layout: "classic" }), ...patch } }));
    }

    async function onSave() {
        start(async () => {
            try {
                const res = await saveResume(id, data, title, template);
                setAtsScore(res.atsScore);
                toast.success("Resume saved");
            } catch (e: any) { toast.error(e?.message || "Failed to save"); }
        });
    }

    async function aiSummary() {
        setAiLoading("summary");
        const res = await fetch("/api/ai/summary", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) });
        setAiLoading(null);
        if (!res.ok) return toast.error("AI failed");
        const j = await res.json();
        update("summary", j.text);
        toast.success("AI summary generated");
    }

    async function aiSkills() {
        setAiLoading("skills");
        const res = await fetch("/api/ai/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) });
        setAiLoading(null);
        if (!res.ok) return toast.error("AI failed");
        const j = await res.json();
        update("skills", Array.from(new Set([...data.skills, ...j.skills])));
        toast.success("Skills added");
    }

    async function aiBullets(expIdx: number) {
        setAiLoading(`bul-${expIdx}`);
        const exp = data.experience[expIdx];
        const res = await fetch("/api/ai/bullets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: exp.role, company: exp.company, current: exp.bullets }) });
        setAiLoading(null);
        if (!res.ok) return toast.error("AI failed");
        const j = await res.json();
        const next = [...data.experience];
        next[expIdx] = { ...exp, bullets: j.bullets };
        update("experience", next);
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {/* EDITOR */}
            <div className="space-y-4">
                <Card className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="max-w-xs text-base font-semibold" />
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" onClick={() => duplicateResume(id).then(() => toast.success("Duplicated"))}><Copy className="mr-1 h-4 w-4" />Duplicate</Button>
                            <Button size="sm" variant="outline" onClick={() => toggleShare(id).then((r) => toast.success(r.isPublic ? "Public link enabled" : "Made private"))}><Share2 className="mr-1 h-4 w-4" />Share</Button>
                            <Button size="sm" variant="outline" asChild><a href={`/api/resume/${id}/pdf`} target="_blank"><Download className="mr-1 h-4 w-4" />PDF</a></Button>
                            <Button size="sm" variant="destructive" onClick={() => { if (confirm("Delete this resume?")) deleteResume(id); }}><Trash2 className="h-4 w-4" /></Button>
                            <Button size="sm" variant="gradient" onClick={onSave} disabled={pending}><Save className="mr-1 h-4 w-4" />{pending ? "Saving…" : "Save"}</Button>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1"><Progress value={atsScore} /></div>
                        <Badge variant={atsScore >= 80 ? "success" : "secondary"}>ATS {atsScore}%</Badge>
                    </div>
                </Card>

                <div className="flex flex-wrap gap-2">
                    {[
                        ["personal", "Personal"], ["summary", "Summary"], ["experience", "Experience"],
                        ["education", "Education"], ["skills", "Skills"], ["projects", "Projects"],
                        ["more", "More"], ["design", "🎨 Design"]
                    ].map(([k, l]) => (
                        <button key={k} onClick={() => setTab(k as any)}
                            className={`rounded-lg px-3 py-1.5 text-xs transition ${tab === k ? "bg-gradient-brand text-white" : "border bg-card hover:bg-accent"}`}>
                            {l}
                        </button>
                    ))}
                </div>

                <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    {tab === "personal" && (
                        <Card className="p-5 space-y-3">
                            <Section title="Personal Information" />
                            <Grid2>
                                <Field label="Full name" v={data.personal.fullName} onChange={(v) => update("personal", { ...data.personal, fullName: v })} />
                                <Field label="Job title" v={data.personal.title || ""} onChange={(v) => update("personal", { ...data.personal, title: v })} />
                                <Field label="Email" v={data.personal.email} onChange={(v) => update("personal", { ...data.personal, email: v })} />
                                <Field label="Phone" v={data.personal.phone || ""} onChange={(v) => update("personal", { ...data.personal, phone: v })} />
                                <Field label="Location" v={data.personal.location || ""} onChange={(v) => update("personal", { ...data.personal, location: v })} />
                                <Field label="Website" v={data.personal.website || ""} onChange={(v) => update("personal", { ...data.personal, website: v })} />
                                <Field label="LinkedIn" v={data.personal.linkedin || ""} onChange={(v) => update("personal", { ...data.personal, linkedin: v })} />
                                <Field label="GitHub" v={data.personal.github || ""} onChange={(v) => update("personal", { ...data.personal, github: v })} />
                            </Grid2>
                        </Card>
                    )}

                    {tab === "summary" && (
                        <Card className="p-5 space-y-3">
                            <div className="flex items-center justify-between"><Section title="Professional Summary" /><Button size="sm" variant="gradient" onClick={aiSummary} disabled={aiLoading === "summary"}><Sparkles className="mr-1 h-4 w-4" />{aiLoading === "summary" ? "Generating…" : "AI Generate"}</Button></div>
                            <Textarea rows={6} value={data.summary} onChange={(e) => update("summary", e.target.value)} placeholder="2–4 sentences highlighting your strengths and goals…" />
                        </Card>
                    )}

                    {tab === "experience" && (
                        <Card className="p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <Section title="Work Experience" />
                                <Button size="sm" variant="outline" onClick={() => update("experience", [...data.experience, { role: "", company: "", startDate: "", endDate: "", bullets: [] }])}><Plus className="mr-1 h-4 w-4" />Add</Button>
                            </div>
                            {data.experience.map((e, i) => (
                                <Card key={i} className="p-4 space-y-2">
                                    <Grid2>
                                        <Field label="Role" v={e.role} onChange={(v) => { const n = [...data.experience]; n[i] = { ...e, role: v }; update("experience", n); }} />
                                        <Field label="Company" v={e.company} onChange={(v) => { const n = [...data.experience]; n[i] = { ...e, company: v }; update("experience", n); }} />
                                        <Field label="Start" v={e.startDate} onChange={(v) => { const n = [...data.experience]; n[i] = { ...e, startDate: v }; update("experience", n); }} />
                                        <Field label="End" v={e.endDate || ""} onChange={(v) => { const n = [...data.experience]; n[i] = { ...e, endDate: v }; update("experience", n); }} />
                                    </Grid2>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <Label>Bullet points</Label>
                                            <Button size="sm" variant="gradient" onClick={() => aiBullets(i)} disabled={aiLoading === `bul-${i}`}>
                                                <Sparkles className="mr-1 h-4 w-4" />{aiLoading === `bul-${i}` ? "AI…" : "Enhance with AI"}
                                            </Button>
                                        </div>
                                        <Textarea rows={4} value={e.bullets.join("\n")} onChange={(ev) => { const n = [...data.experience]; n[i] = { ...e, bullets: ev.target.value.split("\n") }; update("experience", n); }} placeholder="One bullet per line" />
                                    </div>
                                    <Button size="sm" variant="ghost" onClick={() => update("experience", data.experience.filter((_, k) => k !== i))}><X className="mr-1 h-4 w-4" />Remove</Button>
                                </Card>
                            ))}
                        </Card>
                    )}

                    {tab === "education" && (
                        <Card className="p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <Section title="Education" />
                                <Button size="sm" variant="outline" onClick={() => update("education", [...data.education, { school: "", degree: "", startDate: "", endDate: "" }])}><Plus className="mr-1 h-4 w-4" />Add</Button>
                            </div>
                            {data.education.map((e, i) => (
                                <Card key={i} className="p-4 space-y-2">
                                    <Grid2>
                                        <Field label="School" v={e.school} onChange={(v) => { const n = [...data.education]; n[i] = { ...e, school: v }; update("education", n); }} />
                                        <Field label="Degree" v={e.degree} onChange={(v) => { const n = [...data.education]; n[i] = { ...e, degree: v }; update("education", n); }} />
                                        <Field label="Field" v={e.field || ""} onChange={(v) => { const n = [...data.education]; n[i] = { ...e, field: v }; update("education", n); }} />
                                        <Field label="Grade" v={e.grade || ""} onChange={(v) => { const n = [...data.education]; n[i] = { ...e, grade: v }; update("education", n); }} />
                                        <Field label="Start" v={e.startDate} onChange={(v) => { const n = [...data.education]; n[i] = { ...e, startDate: v }; update("education", n); }} />
                                        <Field label="End" v={e.endDate || ""} onChange={(v) => { const n = [...data.education]; n[i] = { ...e, endDate: v }; update("education", n); }} />
                                    </Grid2>
                                    <Button size="sm" variant="ghost" onClick={() => update("education", data.education.filter((_, k) => k !== i))}><X className="mr-1 h-4 w-4" />Remove</Button>
                                </Card>
                            ))}
                        </Card>
                    )}

                    {tab === "skills" && (
                        <Card className="p-5 space-y-3">
                            <div className="flex items-center justify-between">
                                <Section title="Skills" />
                                <Button size="sm" variant="gradient" onClick={aiSkills} disabled={aiLoading === "skills"}><Sparkles className="mr-1 h-4 w-4" />{aiLoading === "skills" ? "AI…" : "Suggest Skills"}</Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((s, i) => (
                                    <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => update("skills", data.skills.filter((_, k) => k !== i))}>{s} ×</Badge>
                                ))}
                            </div>
                            <Input placeholder="Type a skill and press Enter" onKeyDown={(e) => {
                                if (e.key === "Enter") { e.preventDefault(); const v = (e.target as HTMLInputElement).value.trim(); if (v) update("skills", [...new Set([...data.skills, v])]); (e.target as HTMLInputElement).value = ""; }
                            }} />
                        </Card>
                    )}

                    {tab === "projects" && (
                        <Card className="p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <Section title="Projects" />
                                <Button size="sm" variant="outline" onClick={() => update("projects", [...data.projects, { name: "", description: "", url: "", tech: [] }])}><Plus className="mr-1 h-4 w-4" />Add</Button>
                            </div>
                            {data.projects.map((p, i) => (
                                <Card key={i} className="p-4 space-y-2">
                                    <Grid2>
                                        <Field label="Name" v={p.name} onChange={(v) => { const n = [...data.projects]; n[i] = { ...p, name: v }; update("projects", n); }} />
                                        <Field label="URL" v={p.url || ""} onChange={(v) => { const n = [...data.projects]; n[i] = { ...p, url: v }; update("projects", n); }} />
                                    </Grid2>
                                    <Label>Description</Label>
                                    <Textarea rows={3} value={p.description} onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, description: ev.target.value }; update("projects", n); }} />
                                    <Label>Tech (comma separated)</Label>
                                    <Input value={p.tech.join(", ")} onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, tech: ev.target.value.split(",").map(t => t.trim()).filter(Boolean) }; update("projects", n); }} />
                                    <Button size="sm" variant="ghost" onClick={() => update("projects", data.projects.filter((_, k) => k !== i))}><X className="mr-1 h-4 w-4" />Remove</Button>
                                </Card>
                            ))}
                        </Card>
                    )}

                    {tab === "more" && (
                        <Card className="p-5 space-y-4">
                            <Section title="Certifications" />
                            {data.certifications.map((c, i) => (
                                <Grid2 key={i}>
                                    <Field label="Name" v={c.name} onChange={(v) => { const n = [...data.certifications]; n[i] = { ...c, name: v }; update("certifications", n); }} />
                                    <Field label="Issuer" v={c.issuer || ""} onChange={(v) => { const n = [...data.certifications]; n[i] = { ...c, issuer: v }; update("certifications", n); }} />
                                </Grid2>
                            ))}
                            <Button size="sm" variant="outline" onClick={() => update("certifications", [...data.certifications, { name: "" }])}><Plus className="mr-1 h-4 w-4" />Add certification</Button>

                            <Section title="Languages" />
                            {data.languages.map((l, i) => (
                                <Grid2 key={i}>
                                    <Field label="Language" v={l.name} onChange={(v) => { const n = [...data.languages]; n[i] = { ...l, name: v }; update("languages", n); }} />
                                    <Field label="Level" v={l.level || ""} onChange={(v) => { const n = [...data.languages]; n[i] = { ...l, level: v }; update("languages", n); }} />
                                </Grid2>
                            ))}
                            <Button size="sm" variant="outline" onClick={() => update("languages", [...data.languages, { name: "" }])}><Plus className="mr-1 h-4 w-4" />Add language</Button>
                        </Card>
                    )}

                    {tab === "design" && (
                        <Card className="p-5 space-y-6">
                            {/* Template selector */}
                            <div>
                                <Section title="Template" />
                                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                    {TEMPLATES.map((t) => (
                                        <button key={t.id} onClick={() => setTemplate(t.id)}
                                            className={`rounded-xl border-2 p-3 text-left transition ${template === t.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-border hover:border-indigo-300 bg-card"}`}>
                                            <div className="font-semibold text-sm">{t.label}</div>
                                            <div className="text-xs text-muted-foreground">{t.desc}</div>
                                            {/* Mini preview swatch */}
                                            <div className="mt-2 h-10 rounded overflow-hidden border" style={{ borderColor: style.accentColor }}>
                                                {t.id === "CORPORATE" && <div className="h-full w-full" style={{ background: `linear-gradient(90deg, ${style.accentColor} 35%, #f8fafc 35%)` }} />}
                                                {t.id === "CREATIVE" && <div className="h-full w-full" style={{ background: `linear-gradient(135deg, ${style.accentColor} 50%, #f8fafc 50%)` }} />}
                                                {t.id === "MINIMAL" && <div className="h-full w-full flex items-center justify-center border-t-2" style={{ borderColor: style.accentColor }}><div className="text-[10px] text-muted-foreground tracking-widest uppercase">Minimal</div></div>}
                                                {t.id === "GOVERNMENT" && <div className="h-full w-full flex flex-col items-center justify-center gap-0.5"><div className="h-0.5 w-3/4 rounded" style={{ backgroundColor: style.accentColor }} /><div className="h-0.5 w-1/2 rounded" style={{ backgroundColor: style.accentColor + "66" }} /></div>}
                                                {t.id === "MODERN" && <div className="h-full w-full flex"><div className="w-1 h-full" style={{ backgroundColor: style.accentColor }} /><div className="flex-1 bg-slate-50 dark:bg-slate-900" /></div>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Accent color */}
                            <div>
                                <Section title="Accent Color" />
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {ACCENT_PRESETS.map((c) => (
                                        <button key={c} onClick={() => updateStyle({ accentColor: c })}
                                            className={`h-7 w-7 rounded-full border-2 transition ${style.accentColor === c ? "border-foreground scale-110 shadow-md" : "border-transparent hover:scale-105"}`}
                                            style={{ backgroundColor: c }} title={c} />
                                    ))}
                                    <div className="flex items-center gap-2 ml-1">
                                        <Label className="text-xs text-muted-foreground">Custom:</Label>
                                        <input type="color" value={style.accentColor} onChange={(e) => updateStyle({ accentColor: e.target.value })}
                                            className="h-7 w-10 cursor-pointer rounded border border-border bg-transparent" />
                                        <span className="text-xs text-muted-foreground font-mono">{style.accentColor}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Font family */}
                            <div>
                                <Section title="Font Family" />
                                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {FONTS.map((f) => (
                                        <button key={f.id} onClick={() => updateStyle({ fontFamily: f.id as any })}
                                            className={`rounded-lg border-2 px-3 py-2 text-left transition ${style.fontFamily === f.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-border hover:border-indigo-300 bg-card"}`}>
                                            <span className="text-sm font-medium">{f.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Live preview hint */}
                            <p className="text-xs text-muted-foreground">Changes are reflected live in the preview →</p>
                        </Card>
                    )}
                </motion.div>
            </div>

            {/* PREVIEW */}
            <div className="lg:sticky lg:top-20 lg:self-start">
                <Card className="overflow-hidden">
                    <div className="border-b bg-card/50 px-4 py-2 text-xs text-muted-foreground flex items-center gap-2">
                        <Palette className="h-3 w-3" /> Live preview • <span className="font-medium">{TEMPLATES.find(t => t.id === template)?.label ?? template}</span>
                        <span className="inline-block h-3 w-3 rounded-full border border-border" style={{ backgroundColor: style.accentColor }} />
                    </div>
                    <div className="max-h-[80vh] overflow-y-auto bg-white p-8 text-slate-900">
                        <ResumePreview data={data} template={template} style={style} />
                    </div>
                </Card>
            </div>
        </div>
    );
}

function Section({ title }: { title: string }) {
    return <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>;
}
function Grid2({ children }: { children: React.ReactNode }) {
    return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}
function Field({ label, v, onChange }: { label: string; v: string; onChange: (v: string) => void }) {
    return <div className="space-y-1"><Label>{label}</Label><Input value={v} onChange={(e) => onChange(e.target.value)} /></div>;
}
