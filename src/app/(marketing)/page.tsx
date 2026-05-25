"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, FileText, MessageSquare, Briefcase, Star, Check, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function HomePage() {
    return (
        <div className="space-y-32 py-16">
            {/* HERO */}
            <section className="relative grid place-items-center text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Badge variant="gradient" className="mb-5 animate-float">
                        <Sparkles className="mr-1 h-3 w-3" /> Now in Beta — Free for Pakistani Students
                    </Badge>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
                    className="mx-auto max-w-4xl text-balance text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
                >
                    The <span className="text-gradient bg-[length:200%_auto] animate-gradient-x">AI Resume Builder</span> <br className="hidden sm:block" />
                    built for <span className="text-gradient">Pakistan</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
                    className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
                >
                    Land jobs faster with ATS-friendly resumes, AI cover letters, LinkedIn optimization, and mock interviews — all in one
                    modern platform crafted for students, graduates, government job applicants & remote workers.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
                >
                    <Button asChild size="lg" variant="gradient" className="group">
                        <Link href="/register">
                            Build my AI Resume <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline"><Link href="/templates">View Templates</Link></Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
                    className="relative mx-auto mt-16 w-full max-w-5xl"
                >
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/40 via-fuchsia-500/40 to-pink-500/40 blur-2xl" />
                    <div className="glass relative rounded-3xl border p-2 shadow-2xl">
                        <div className="rounded-2xl bg-background/60 p-6 md:p-10">
                            <div className="grid gap-6 md:grid-cols-3">
                                {[
                                    { k: "Resumes Built", v: "12,400+" },
                                    { k: "AI Suggestions", v: "85,000+" },
                                    { k: "Interview Wins", v: "92%" },
                                ].map((s) => (
                                    <div key={s.k} className="rounded-xl border bg-card/50 p-5 text-center">
                                        <div className="text-3xl font-bold text-gradient">{s.v}</div>
                                        <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.k}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* FEATURES */}
            <section id="features">
                <motion.div {...fadeUp} className="mb-12 text-center">
                    <Badge variant="outline">Features</Badge>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight">Everything you need to land your dream job</h2>
                    <p className="mt-3 text-muted-foreground">All powered by GPT-4 class models, optimized for Pakistani career paths.</p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((f, i) => (
                        <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.05, duration: 0.5 }}>
                            <Card className="group relative h-full overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition group-hover:opacity-30" />
                                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-gradient-brand text-white shadow-lg shadow-fuchsia-500/30">
                                    <f.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold">{f.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TEMPLATES */}
            <section>
                <motion.div {...fadeUp} className="mb-10 text-center">
                    <Badge variant="outline">Templates</Badge>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight">Beautiful, ATS-friendly resume templates</h2>
                </motion.div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {templates.map((t, i) => (
                        <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.07 }}>
                            <Card className="group overflow-hidden">
                                <div className={`h-48 ${t.bg} relative`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <div className="text-xs opacity-80">Template</div>
                                        <div className="text-lg font-bold">{t.name}</div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section>
                <motion.div {...fadeUp} className="mb-10 text-center">
                    <Badge variant="outline">Trusted across Pakistan</Badge>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight">Loved by job seekers nationwide</h2>
                </motion.div>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.07 }}>
                            <Card className="h-full p-6">
                                <div className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-amber-400" />)}</div>
                                <p className="mt-3 text-sm text-muted-foreground">“{t.quote}”</p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white">{t.name[0]}</div>
                                    <div>
                                        <div className="text-sm font-semibold">{t.name}</div>
                                        <div className="text-xs text-muted-foreground">{t.role}</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PRICING */}
            <section>
                <motion.div {...fadeUp} className="mb-10 text-center">
                    <Badge variant="outline">Pricing</Badge>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight">Free to start. Premium when you grow.</h2>
                </motion.div>
                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                    <Card className="p-8">
                        <h3 className="text-xl font-semibold">Free</h3>
                        <div className="mt-2 text-4xl font-bold">PKR 0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                        <ul className="mt-6 space-y-2 text-sm">
                            {["1 Resume", "20 AI credits / month", "Basic templates", "PDF export"].map((x) => (
                                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> {x}</li>
                            ))}
                        </ul>
                        <Button asChild variant="outline" className="mt-6 w-full"><Link href="/register">Start free</Link></Button>
                    </Card>
                    <Card className="relative overflow-hidden p-8 ring-1 ring-fuchsia-500/40">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
                        <Badge variant="gradient" className="mb-2">Most Popular</Badge>
                        <h3 className="text-xl font-semibold">Premium</h3>
                        <div className="mt-2 text-4xl font-bold">PKR 1,499<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                        <ul className="mt-6 space-y-2 text-sm">
                            {["Unlimited resumes", "Unlimited AI credits", "All premium templates", "Cover letters & LinkedIn tools", "Interview preparation", "Priority support"].map((x) => (
                                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> {x}</li>
                            ))}
                        </ul>
                        <Button asChild variant="gradient" className="mt-6 w-full"><Link href="/pricing">Upgrade to Premium</Link></Button>
                    </Card>
                </div>
            </section>

            {/* FAQ */}
            <section>
                <motion.div {...fadeUp} className="mb-10 text-center">
                    <Badge variant="outline">FAQ</Badge>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight">Frequently asked questions</h2>
                </motion.div>
                <div className="mx-auto max-w-3xl space-y-3">
                    {faqs.map((f) => (
                        <details key={f.q} className="group rounded-xl border bg-card p-5">
                            <summary className="cursor-pointer list-none text-sm font-semibold flex justify-between items-center">
                                {f.q}<span className="text-muted-foreground transition group-open:rotate-45">+</span>
                            </summary>
                            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section>
                <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl border bg-gradient-brand p-10 text-center text-white shadow-2xl">
                    <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />
                    <h2 className="relative text-3xl font-bold sm:text-4xl">Ready to upgrade your career?</h2>
                    <p className="relative mt-2 opacity-90">Join thousands of Pakistanis landing jobs with CareerPilot AI.</p>
                    <div className="relative mt-6 flex justify-center gap-3">
                        <Button asChild size="lg" variant="secondary"><Link href="/register">Get Started Free</Link></Button>
                        <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white">
                            <Link href="/pricing">See Pricing</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

const features = [
    { icon: FileText, title: "AI Resume Builder", desc: "Drag-and-drop sections, live preview, and ATS scoring as you type." },
    { icon: Sparkles, title: "AI Summary & Bullets", desc: "Generate impactful summaries and rewrite bullets to sound senior." },
    { icon: MessageSquare, title: "Cover Letter Generator", desc: "Job-specific cover letters tailored to Pakistani employers." },
    { icon: Brain, title: "Interview Practice", desc: "Mock HR, behavioral & technical interviews powered by AI." },
    { icon: Briefcase, title: "Pakistan Job Board", desc: "Curated remote, corporate and government job listings." },
    { icon: Zap, title: "LinkedIn Optimizer", desc: "AI headline, About section, and skill suggestions." },
    { icon: Shield, title: "ATS Analyzer", desc: "Score your resume against any job description." },
    { icon: Globe, title: "Multiple Templates", desc: "Modern, Corporate, Minimal, Creative & Government formats." },
    { icon: Star, title: "Easy PDF Export", desc: "Crisp PDFs that pass ATS scanners and look amazing." },
];

const templates = [
    { name: "Modern", desc: "Clean two-column layout with accent color", bg: "bg-gradient-to-br from-indigo-500 to-purple-600" },
    { name: "Corporate", desc: "Polished single column for traditional roles", bg: "bg-gradient-to-br from-slate-700 to-slate-900" },
    { name: "Minimal", desc: "Whitespace-rich, typography-first", bg: "bg-gradient-to-br from-zinc-200 to-zinc-400" },
    { name: "Government", desc: "BPS-friendly format for FPSC/PPSC", bg: "bg-gradient-to-br from-emerald-600 to-emerald-900" },
];

const testimonials = [
    { name: "Ahmed Raza", role: "Software Engineer, Karachi", quote: "Got 4 interview calls in 2 weeks after using the ATS analyzer. Game changer." },
    { name: "Sana Malik", role: "Fresh Graduate, Lahore", quote: "The AI summary made my resume sound 10× more professional." },
    { name: "Bilal Khan", role: "Govt Job Aspirant, Islamabad", quote: "Government template + cover letter generator helped me crack FPSC interview." },
];

const faqs = [
    { q: "Is CareerPilot AI free to use?", a: "Yes — the Free plan lets you build 1 resume with 20 AI credits per month." },
    { q: "Do you support Pakistani job formats?", a: "Absolutely. We offer dedicated government (BPS), corporate, and remote-friendly templates." },
    { q: "Are payments in PKR?", a: "Yes. We accept JazzCash, Easypaisa and international cards via Stripe." },
    { q: "Are my resumes ATS-friendly?", a: "Every template is designed to pass leading ATS systems (Workday, Greenhouse, etc.)." },
];
