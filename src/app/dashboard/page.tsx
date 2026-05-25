import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Sparkles, Download, TrendingUp, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function DashboardOverview() {
    const session = await auth();
    const userId = session!.user.id;

    const [resumes, aiUsage, exports, user] = await Promise.all([
        prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, take: 5 }),
        prisma.aIUsage.count({ where: { userId } }),
        prisma.exportHistory.count({ where: { resume: { userId } } }),
        prisma.user.findUnique({ where: { id: userId } }),
    ]);

    const totalResumes = await prisma.resume.count({ where: { userId } });
    const avgAts = resumes.length ? Math.round(resumes.reduce((a, r) => a + r.atsScore, 0) / resumes.length) : 0;
    const profileCompletion = Math.min(100,
        (user?.name ? 25 : 0) + (user?.image ? 25 : 0) + (totalResumes ? 25 : 0) + (aiUsage > 0 ? 25 : 0));

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Your career, supercharged with AI.</p>
                </div>
                <Button asChild variant="gradient"><Link href="/dashboard/resumes/new"><Plus className="mr-1 h-4 w-4" /> New Resume</Link></Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={<FileText className="h-5 w-5" />} label="Total Resumes" value={totalResumes} />
                <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Avg ATS Score" value={`${avgAts}%`} />
                <StatCard icon={<Sparkles className="h-5 w-5" />} label="AI Suggestions" value={aiUsage} />
                <StatCard icon={<Download className="h-5 w-5" />} label="Downloads" value={exports} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Recent resumes</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {resumes.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-10 text-center">
                                <p className="text-sm text-muted-foreground">You haven’t created a resume yet.</p>
                                <Button asChild variant="gradient" className="mt-4"><Link href="/dashboard/resumes/new">Build your first resume</Link></Button>
                            </div>
                        ) : resumes.map((r) => (
                            <Link key={r.id} href={`/dashboard/resumes/${r.id}`} className="flex items-center justify-between rounded-lg border p-4 transition hover:bg-accent">
                                <div>
                                    <div className="font-semibold">{r.title}</div>
                                    <div className="text-xs text-muted-foreground">{r.template} • Updated {new Date(r.updatedAt).toLocaleDateString()}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary">ATS {r.atsScore}%</Badge>
                                    <Badge variant="outline">{r.downloads} downloads</Badge>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Profile completion</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gradient">{profileCompletion}%</span>
                            <Badge variant={profileCompletion === 100 ? "success" : "secondary"}>
                                {profileCompletion === 100 ? "Complete" : "In progress"}
                            </Badge>
                        </div>
                        <Progress value={profileCompletion} />
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                            <li>• Add a profile photo</li>
                            <li>• Create at least 1 resume</li>
                            <li>• Try an AI suggestion</li>
                            <li>• Connect LinkedIn (coming soon)</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Career suggestions for you</CardTitle></CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-3">
                    {[
                        { t: "Run an ATS analysis", d: "Score your resume against any job posting.", h: "/dashboard/ai/ats" },
                        { t: "Generate a cover letter", d: "Tailored to the role in seconds.", h: "/dashboard/ai/cover-letter" },
                        { t: "Practice an interview", d: "Mock HR or technical interview powered by AI.", h: "/dashboard/ai/interview" },
                    ].map((s) => (
                        <Link key={s.h} href={s.h} className="group rounded-xl border p-4 transition hover:bg-accent">
                            <div className="font-semibold group-hover:text-gradient">{s.t}</div>
                            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
    return (
        <Card className="overflow-hidden p-5">
            <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white">{icon}</div>
            </div>
            <div className="mt-3 text-3xl font-bold">{value}</div>
        </Card>
    );
}
