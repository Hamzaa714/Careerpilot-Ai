import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { formatPKR } from "@/lib/utils";
import { Briefcase, MapPin } from "lucide-react";

export const metadata = { title: "Jobs in Pakistan" };
export const revalidate = 60;

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    const jobs = await prisma.job.findMany({
        where: q
            ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { company: { contains: q, mode: "insensitive" } }, { skills: { hasSome: [q] } }] }
            : { isActive: true },
        orderBy: { postedAt: "desc" },
        take: 50,
    }).catch(() => []);

    return (
        <div className="py-12">
            <div className="text-center">
                <Badge variant="outline">Job Board</Badge>
                <h1 className="mt-3 text-4xl font-bold tracking-tight">Find your next role in Pakistan</h1>
            </div>
            <form className="mx-auto mt-6 flex max-w-xl gap-2">
                <Input name="q" defaultValue={q} placeholder="Search by title, company or skill" />
                <Button variant="gradient">Search</Button>
            </form>
            <div className="mt-10 grid gap-4">
                {jobs.length === 0 ? (
                    <Card className="p-10 text-center text-muted-foreground">No jobs yet. Run <code>npm run db:seed</code> to add sample listings.</Card>
                ) : (
                    jobs.map((j) => (
                        <Card key={j.id} className="p-5 transition hover:shadow-lg">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-fuchsia-500" /><span className="font-semibold">{j.title}</span></div>
                                    <div className="mt-1 text-sm text-muted-foreground">{j.company} • <MapPin className="inline h-3 w-3" /> {j.location} • {j.type}</div>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {j.skills.slice(0, 6).map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                                    </div>
                                </div>
                                <div className="text-right">
                                    {j.salaryMin && j.salaryMax && (
                                        <div className="text-sm font-semibold text-gradient">{formatPKR(j.salaryMin)} – {formatPKR(j.salaryMax)}</div>
                                    )}
                                    <Button asChild size="sm" variant="gradient" className="mt-2">
                                        <Link href={j.applyUrl || "/login"}>Apply</Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
