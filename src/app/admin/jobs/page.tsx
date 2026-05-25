import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminJobs() {
    const jobs = await prisma.job.findMany({ orderBy: { postedAt: "desc" } });
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
            <div className="grid gap-3">
                {jobs.map((j) => (
                    <Card key={j.id} className="p-4">
                        <div className="flex justify-between">
                            <div>
                                <div className="font-semibold">{j.title}</div>
                                <div className="text-sm text-muted-foreground">{j.company} • {j.location}</div>
                            </div>
                            <Badge variant={j.isActive ? "success" : "outline"}>{j.isActive ? "Active" : "Inactive"}</Badge>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
