import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SavedJobsPage() {
    const session = await auth();
    const saved = await prisma.savedJob.findMany({
        where: { userId: session!.user.id },
        include: { job: true },
        orderBy: { createdAt: "desc" },
    });
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
            {saved.length === 0 ? (
                <Card className="p-10 text-center text-muted-foreground">You haven’t saved any jobs yet. Browse the <a href="/jobs" className="underline">job board</a>.</Card>
            ) : saved.map((s) => (
                <Card key={s.id} className="p-5">
                    <div className="flex justify-between">
                        <div>
                            <div className="font-semibold">{s.job.title}</div>
                            <div className="text-sm text-muted-foreground">{s.job.company} • {s.job.location}</div>
                        </div>
                        <Badge variant="secondary">{s.status}</Badge>
                    </div>
                </Card>
            ))}
        </div>
    );
}
