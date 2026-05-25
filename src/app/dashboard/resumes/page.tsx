import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";

export default async function ResumesPage() {
    const session = await auth();
    const resumes = await prisma.resume.findMany({
        where: { userId: session!.user.id },
        orderBy: { updatedAt: "desc" },
    });
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
                <Button asChild variant="gradient"><Link href="/dashboard/resumes/new"><Plus className="mr-1 h-4 w-4" /> New Resume</Link></Button>
            </div>
            {resumes.length === 0 ? (
                <Card className="p-12 text-center">
                    <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h2 className="mt-3 text-xl font-semibold">No resumes yet</h2>
                    <p className="text-sm text-muted-foreground">Build your first AI-powered resume in seconds.</p>
                    <Button asChild variant="gradient" className="mt-5"><Link href="/dashboard/resumes/new">Create resume</Link></Button>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {resumes.map((r) => (
                        <Link key={r.id} href={`/dashboard/resumes/${r.id}`}>
                            <Card className="group h-full p-5 transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline">{r.template}</Badge>
                                    <Badge variant="secondary">ATS {r.atsScore}%</Badge>
                                </div>
                                <div className="mt-4 text-lg font-semibold group-hover:text-gradient">{r.title}</div>
                                <div className="mt-1 text-xs text-muted-foreground">Updated {new Date(r.updatedAt).toLocaleDateString()}</div>
                                <div className="mt-4 h-32 rounded-lg border bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-pink-500/10" />
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
