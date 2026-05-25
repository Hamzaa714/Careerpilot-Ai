"use client";
import type { ResumeData, ResumeStyle } from "@/lib/validators";

const FONT_MAP: Record<string, string> = {
    inter: "'Inter', 'Segoe UI', sans-serif",
    georgia: "Georgia, 'Times New Roman', serif",
    roboto: "'Roboto', 'Arial', sans-serif",
    merriweather: "'Merriweather', Georgia, serif",
    playfair: "'Playfair Display', Georgia, serif",
};

type PreviewProps = {
    data: ResumeData;
    template: string;
    style?: ResumeStyle;
};

export function ResumePreview({ data, template, style }: PreviewProps) {
    const accent = style?.accentColor ?? "#6366f1";
    const font = FONT_MAP[style?.fontFamily ?? "inter"] ?? FONT_MAP.inter;
    const baseStyle: React.CSSProperties = { fontFamily: font };

    if (template === "CORPORATE") return <CorporateTemplate data={data} accent={accent} baseStyle={baseStyle} />;
    if (template === "MINIMAL") return <MinimalTemplate data={data} accent={accent} baseStyle={baseStyle} />;
    if (template === "GOVERNMENT") return <GovernmentTemplate data={data} accent={accent} baseStyle={baseStyle} />;
    if (template === "CREATIVE") return <CreativeTemplate data={data} accent={accent} baseStyle={baseStyle} />;
    return <ModernTemplate data={data} accent={accent} baseStyle={baseStyle} />;
}

/* ─────────────────────── MODERN ─────────────────────── */
function ModernTemplate({ data, accent, baseStyle }: { data: ResumeData; accent: string; baseStyle: React.CSSProperties }) {
    return (
        <div style={baseStyle} className="text-[12.5px] leading-relaxed text-slate-800">
            <div style={{ borderLeftColor: accent }} className="border-l-4 pl-4 mb-4">
                <div className="text-2xl font-bold tracking-tight text-slate-900">{data.personal.fullName || "Your Name"}</div>
                {data.personal.title && <div className="text-sm font-medium mt-0.5" style={{ color: accent }}>{data.personal.title}</div>}
                <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-500">
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>• {data.personal.phone}</span>}
                    {data.personal.location && <span>• {data.personal.location}</span>}
                    {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
                    {data.personal.github && <span>• {data.personal.github}</span>}
                    {data.personal.website && <span>• {data.personal.website}</span>}
                </div>
            </div>
            {data.summary && <Section title="Summary" accent={accent}><p className="text-slate-700">{data.summary}</p></Section>}
            {data.experience.length > 0 && (
                <Section title="Experience" accent={accent}>
                    {data.experience.map((e, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between items-start">
                                <div><strong className="text-slate-900">{e.role || "Role"}</strong>{e.company && <span className="text-slate-600"> @ {e.company}</span>}</div>
                                <span className="text-xs text-slate-500 shrink-0 ml-2">{e.startDate}{e.startDate ? " – " : ""}{e.endDate || (e.startDate ? "Present" : "")}</span>
                            </div>
                            <ul className="ml-4 mt-1 list-disc space-y-0.5 text-slate-700">
                                {e.bullets.filter(Boolean).map((b, k) => <li key={k}>{b}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            )}
            {data.education.length > 0 && (
                <Section title="Education" accent={accent}>
                    {data.education.map((e, i) => (
                        <div key={i} className="flex justify-between mb-1">
                            <div><strong>{e.school}</strong><div className="text-slate-600">{e.degree}{e.field ? ` in ${e.field}` : ""}{e.grade ? ` • ${e.grade}` : ""}</div></div>
                            <span className="text-xs text-slate-500 shrink-0 ml-2">{e.startDate}{e.startDate ? " – " : ""}{e.endDate || (e.startDate ? "Present" : "")}</span>
                        </div>
                    ))}
                </Section>
            )}
            {data.skills.length > 0 && (
                <Section title="Skills" accent={accent}>
                    <div className="flex flex-wrap gap-1.5">
                        {data.skills.map((s, i) => <span key={i} className="rounded px-2 py-0.5 text-xs text-white" style={{ backgroundColor: accent }}>{s}</span>)}
                    </div>
                </Section>
            )}
            <SharedExtras data={data} accent={accent} />
        </div>
    );
}

/* ─────────────────────── CORPORATE ─────────────────────── */
function CorporateTemplate({ data, accent, baseStyle }: { data: ResumeData; accent: string; baseStyle: React.CSSProperties }) {
    return (
        <div style={baseStyle} className="text-[12.5px] leading-relaxed">
            <div className="text-white px-6 py-4 -mx-8 -mt-8 mb-5" style={{ backgroundColor: accent }}>
                <div className="text-2xl font-bold tracking-tight">{data.personal.fullName || "Your Name"}</div>
                {data.personal.title && <div className="text-sm opacity-90 mt-0.5">{data.personal.title}</div>}
                <div className="mt-2 flex flex-wrap gap-x-4 text-xs opacity-80">
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.location && <span>{data.personal.location}</span>}
                    {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                    {data.personal.github && <span>{data.personal.github}</span>}
                </div>
            </div>
            {data.summary && (
                <div className="mb-4">
                    <SectionTitle title="Profile" accent={accent} />
                    <p className="text-slate-700">{data.summary}</p>
                </div>
            )}
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2 space-y-4">
                    {data.experience.length > 0 && (
                        <div>
                            <SectionTitle title="Experience" accent={accent} />
                            {data.experience.map((e, i) => (
                                <div key={i} className="mb-3 border-l-2 pl-3" style={{ borderColor: accent + "44" }}>
                                    <div className="font-bold text-slate-900">{e.role || "Role"}</div>
                                    <div className="text-xs font-medium" style={{ color: accent }}>{e.company}{e.location ? ` • ${e.location}` : ""}</div>
                                    <div className="text-xs text-slate-500 mb-1">{e.startDate}{e.startDate ? " – " : ""}{e.endDate || (e.startDate ? "Present" : "")}</div>
                                    <ul className="ml-3 list-disc text-slate-700 space-y-0.5">{e.bullets.filter(Boolean).map((b, k) => <li key={k}>{b}</li>)}</ul>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.education.length > 0 && (
                        <div>
                            <SectionTitle title="Education" accent={accent} />
                            {data.education.map((e, i) => (
                                <div key={i} className="mb-2">
                                    <div className="font-bold">{e.school}</div>
                                    <div className="text-slate-600">{e.degree}{e.field ? ` in ${e.field}` : ""}</div>
                                    <div className="text-xs text-slate-500">{e.startDate} – {e.endDate || "Present"}{e.grade ? ` • ${e.grade}` : ""}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.projects.length > 0 && (
                        <div>
                            <SectionTitle title="Projects" accent={accent} />
                            {data.projects.map((p, i) => (
                                <div key={i} className="mb-2">
                                    <div className="font-bold">{p.name}{p.url && <span className="text-xs text-slate-400 ml-2">{p.url}</span>}</div>
                                    <div className="text-slate-600">{p.description}</div>
                                    {p.tech.length > 0 && <div className="text-xs text-slate-400">Tech: {p.tech.join(", ")}</div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    {data.skills.length > 0 && (
                        <div>
                            <SectionTitle title="Skills" accent={accent} />
                            <ul className="space-y-1 text-slate-700">
                                {data.skills.map((s, i) => <li key={i} className="flex items-center gap-1.5"><span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />{s}</li>)}
                            </ul>
                        </div>
                    )}
                    {data.certifications.length > 0 && (
                        <div>
                            <SectionTitle title="Certifications" accent={accent} />
                            {data.certifications.map((c, i) => <div key={i} className="text-slate-700">{c.name}{c.issuer ? ` — ${c.issuer}` : ""}</div>)}
                        </div>
                    )}
                    {data.languages.length > 0 && (
                        <div>
                            <SectionTitle title="Languages" accent={accent} />
                            {data.languages.map((l, i) => <div key={i} className="text-slate-700">{l.name}{l.level ? ` (${l.level})` : ""}</div>)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── MINIMAL ─────────────────────── */
function MinimalTemplate({ data, accent, baseStyle }: { data: ResumeData; accent: string; baseStyle: React.CSSProperties }) {
    const lbl = "text-[10px] tracking-[0.25em] uppercase font-semibold mb-2";
    return (
        <div style={baseStyle} className="text-[12.5px] leading-relaxed text-slate-800">
            <div className="text-center mb-5 pb-4 border-b border-slate-200">
                <div className="text-2xl font-light tracking-[0.15em] uppercase text-slate-900">{data.personal.fullName || "Your Name"}</div>
                {data.personal.title && <div className="text-xs tracking-[0.2em] uppercase mt-1" style={{ color: accent }}>{data.personal.title}</div>}
                <div className="mt-2 flex flex-wrap justify-center gap-x-4 text-xs text-slate-500">
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.location && <span>{data.personal.location}</span>}
                    {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                    {data.personal.github && <span>{data.personal.github}</span>}
                </div>
            </div>
            {data.summary && <div className="mb-4"><div className={lbl} style={{ color: accent }}>About</div><p className="text-slate-600 leading-relaxed">{data.summary}</p></div>}
            {data.experience.length > 0 && (
                <div className="mb-4">
                    <div className={lbl} style={{ color: accent }}>Experience</div>
                    {data.experience.map((e, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between"><span className="font-medium">{e.role}</span><span className="text-xs text-slate-400">{e.startDate} – {e.endDate || "Present"}</span></div>
                            <div className="text-slate-500 text-xs">{e.company}</div>
                            <ul className="mt-1 ml-3 list-disc text-slate-600 space-y-0.5">{e.bullets.filter(Boolean).map((b, k) => <li key={k}>{b}</li>)}</ul>
                        </div>
                    ))}
                </div>
            )}
            {data.education.length > 0 && (
                <div className="mb-4">
                    <div className={lbl} style={{ color: accent }}>Education</div>
                    {data.education.map((e, i) => (
                        <div key={i} className="mb-2 flex justify-between">
                            <div><div className="font-medium">{e.school}</div><div className="text-slate-500 text-xs">{e.degree}{e.field ? ` in ${e.field}` : ""}</div></div>
                            <span className="text-xs text-slate-400">{e.startDate} – {e.endDate || "Present"}</span>
                        </div>
                    ))}
                </div>
            )}
            {data.skills.length > 0 && <div className="mb-4"><div className={lbl} style={{ color: accent }}>Skills</div><div className="text-slate-600">{data.skills.join(" · ")}</div></div>}
            {data.projects.length > 0 && (
                <div className="mb-4">
                    <div className={lbl} style={{ color: accent }}>Projects</div>
                    {data.projects.map((p, i) => (
                        <div key={i} className="mb-2">
                            <div className="font-medium">{p.name}{p.url && <span className="text-xs text-slate-400 ml-2">{p.url}</span>}</div>
                            <div className="text-slate-500 text-xs">{p.description}</div>
                        </div>
                    ))}
                </div>
            )}
            {data.certifications.length > 0 && <div className="mb-4"><div className={lbl} style={{ color: accent }}>Certifications</div>{data.certifications.map((c, i) => <div key={i} className="text-slate-600">{c.name}{c.issuer ? ` — ${c.issuer}` : ""}</div>)}</div>}
            {data.languages.length > 0 && <div className="mb-4"><div className={lbl} style={{ color: accent }}>Languages</div><div className="text-slate-600">{data.languages.map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`).join(" • ")}</div></div>}
        </div>
    );
}

/* ─────────────────────── GOVERNMENT ─────────────────────── */
function GovernmentTemplate({ data, accent, baseStyle }: { data: ResumeData; accent: string; baseStyle: React.CSSProperties }) {
    const secTitle = "font-bold uppercase text-xs border-b-2 pb-0.5 mb-2";
    return (
        <div style={baseStyle} className="text-[12.5px] leading-relaxed text-slate-900">
            <div className="text-center mb-5">
                <div className="text-xl font-bold uppercase tracking-widest">{data.personal.fullName || "YOUR NAME"}</div>
                {data.personal.title && <div className="font-semibold mt-0.5">{data.personal.title}</div>}
                <div className="mt-1 text-xs border-t border-b py-1 border-slate-300">
                    {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.github].filter(Boolean).join("   |   ")}
                </div>
            </div>
            {data.summary && <div className="mb-3"><div className={secTitle} style={{ borderColor: accent, color: accent }}>PROFESSIONAL SUMMARY</div><p className="text-slate-800">{data.summary}</p></div>}
            {data.experience.length > 0 && (
                <div className="mb-3">
                    <div className={secTitle} style={{ borderColor: accent, color: accent }}>WORK EXPERIENCE</div>
                    {data.experience.map((e, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between font-bold"><span>{e.role?.toUpperCase()}</span><span className="font-normal text-xs">{e.startDate} – {e.endDate || "Present"}</span></div>
                            <div className="font-semibold text-slate-700">{e.company}{e.location ? `, ${e.location}` : ""}</div>
                            <ul className="mt-1 ml-4 list-disc text-slate-700 space-y-0.5">{e.bullets.filter(Boolean).map((b, k) => <li key={k}>{b}</li>)}</ul>
                        </div>
                    ))}
                </div>
            )}
            {data.education.length > 0 && (
                <div className="mb-3">
                    <div className={secTitle} style={{ borderColor: accent, color: accent }}>EDUCATION</div>
                    {data.education.map((e, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex justify-between"><strong>{e.degree}{e.field ? ` IN ${e.field.toUpperCase()}` : ""}</strong><span className="text-xs">{e.endDate || "Present"}</span></div>
                            <div>{e.school}{e.grade ? ` — Grade: ${e.grade}` : ""}</div>
                        </div>
                    ))}
                </div>
            )}
            {data.skills.length > 0 && (
                <div className="mb-3">
                    <div className={secTitle} style={{ borderColor: accent, color: accent }}>SKILLS & COMPETENCIES</div>
                    <div className="columns-2 text-slate-700">{data.skills.map((s, i) => <div key={i} className="flex gap-1.5 items-center"><span>▸</span>{s}</div>)}</div>
                </div>
            )}
            {data.projects.length > 0 && (
                <div className="mb-3">
                    <div className={secTitle} style={{ borderColor: accent, color: accent }}>KEY PROJECTS</div>
                    {data.projects.map((p, i) => <div key={i} className="mb-1"><strong>{p.name}:</strong> {p.description}</div>)}
                </div>
            )}
            {data.certifications.length > 0 && (
                <div className="mb-3">
                    <div className={secTitle} style={{ borderColor: accent, color: accent }}>CERTIFICATIONS</div>
                    {data.certifications.map((c, i) => <div key={i}>{c.name}{c.issuer ? ` — ${c.issuer}` : ""}{c.date ? ` (${c.date})` : ""}</div>)}
                </div>
            )}
            {data.languages.length > 0 && (
                <div className="mb-3">
                    <div className={secTitle} style={{ borderColor: accent, color: accent }}>LANGUAGES</div>
                    <div>{data.languages.map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`).join(" • ")}</div>
                </div>
            )}
        </div>
    );
}

/* ─────────────────────── CREATIVE ─────────────────────── */
function CreativeTemplate({ data, accent, baseStyle }: { data: ResumeData; accent: string; baseStyle: React.CSSProperties }) {
    return (
        <div style={baseStyle} className="text-[12.5px] leading-relaxed">
            <div className="text-white px-6 py-5 -mx-8 -mt-8 mb-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}bb 100%)` }}>
                <div className="text-2xl font-extrabold tracking-tight">{data.personal.fullName || "Your Name"}</div>
                {data.personal.title && <div className="text-sm mt-0.5 opacity-90 font-medium">{data.personal.title}</div>}
                <div className="mt-2 flex flex-wrap gap-x-3 text-xs opacity-80">
                    {data.personal.email && <span>✉ {data.personal.email}</span>}
                    {data.personal.phone && <span>📞 {data.personal.phone}</span>}
                    {data.personal.location && <span>📍 {data.personal.location}</span>}
                    {data.personal.linkedin && <span>🔗 {data.personal.linkedin}</span>}
                    {data.personal.github && <span>💻 {data.personal.github}</span>}
                </div>
            </div>
            {data.summary && <div className="mb-4 rounded-lg p-3" style={{ backgroundColor: accent + "12" }}><div className="font-bold text-xs mb-1" style={{ color: accent }}>✦ About Me</div><p className="text-slate-700">{data.summary}</p></div>}
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 space-y-4">
                    {data.experience.length > 0 && (
                        <div>
                            <div className="font-bold text-sm mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Experience</div>
                            {data.experience.map((e, i) => (
                                <div key={i} className="mb-3 relative pl-3 border-l-2" style={{ borderColor: accent + "55" }}>
                                    <div className="font-bold" style={{ color: accent }}>{e.role}</div>
                                    <div className="font-medium text-slate-700">{e.company}</div>
                                    <div className="text-xs text-slate-400 mb-1">{e.startDate} – {e.endDate || "Present"}</div>
                                    <ul className="ml-2 list-disc text-slate-600 space-y-0.5">{e.bullets.filter(Boolean).map((b, k) => <li key={k}>{b}</li>)}</ul>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.education.length > 0 && (
                        <div>
                            <div className="font-bold text-sm mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Education</div>
                            {data.education.map((e, i) => (
                                <div key={i} className="mb-2">
                                    <div className="font-bold">{e.school}</div>
                                    <div className="text-slate-600 text-xs">{e.degree}{e.field ? ` in ${e.field}` : ""}</div>
                                    <div className="text-xs text-slate-400">{e.startDate} – {e.endDate || "Present"}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.projects.length > 0 && (
                        <div>
                            <div className="font-bold text-sm mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Projects</div>
                            {data.projects.map((p, i) => (
                                <div key={i} className="mb-2 p-2 rounded" style={{ backgroundColor: accent + "0a" }}>
                                    <div className="font-bold">{p.name}</div>
                                    <div className="text-slate-600">{p.description}</div>
                                    {p.tech.length > 0 && <div className="text-xs mt-1 text-slate-400">Tech: {p.tech.join(", ")}</div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-span-2 space-y-4">
                    {data.skills.length > 0 && (
                        <div>
                            <div className="font-bold text-sm mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Skills</div>
                            <div className="space-y-1">{data.skills.map((s, i) => <div key={i} className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: accent }} /><span className="text-slate-700">{s}</span></div>)}</div>
                        </div>
                    )}
                    {data.certifications.length > 0 && (
                        <div>
                            <div className="font-bold text-sm mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Certifications</div>
                            {data.certifications.map((c, i) => <div key={i} className="text-slate-700">{c.name}</div>)}
                        </div>
                    )}
                    {data.languages.length > 0 && (
                        <div>
                            <div className="font-bold text-sm mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Languages</div>
                            {data.languages.map((l, i) => <div key={i} className="text-slate-700">{l.name}{l.level ? ` · ${l.level}` : ""}</div>)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── SHARED ─────────────────────── */
function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
    return (
        <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2" style={{ color: accent, borderColor: accent + "55" }}>{title}</div>
            {children}
        </div>
    );
}

function SectionTitle({ title, accent }: { title: string; accent: string }) {
    return <div className="font-bold uppercase text-xs tracking-widest mb-2 pb-0.5 border-b" style={{ color: accent, borderColor: accent + "55" }}>{title}</div>;
}

function SharedExtras({ data, accent }: { data: ResumeData; accent: string }) {
    return (
        <>
            {data.projects.length > 0 && (
                <Section title="Projects" accent={accent}>
                    {data.projects.map((p, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex justify-between"><strong>{p.name}</strong>{p.url && <span className="text-xs text-slate-500">{p.url}</span>}</div>
                            <div className="text-slate-600">{p.description}</div>
                            {p.tech.length > 0 && <div className="text-xs text-slate-400">Tech: {p.tech.join(", ")}</div>}
                        </div>
                    ))}
                </Section>
            )}
            {data.certifications.length > 0 && (
                <Section title="Certifications" accent={accent}>
                    {data.certifications.map((c, i) => <div key={i} className="text-slate-700">{c.name}{c.issuer ? ` — ${c.issuer}` : ""}{c.date ? ` (${c.date})` : ""}</div>)}
                </Section>
            )}
            {data.languages.length > 0 && (
                <Section title="Languages" accent={accent}>
                    <div className="text-slate-700">{data.languages.map((l) => `${l.name}${l.level ? ` (${l.level})` : ""}`).join(" • ")}</div>
                </Section>
            )}
        </>
    );
}
