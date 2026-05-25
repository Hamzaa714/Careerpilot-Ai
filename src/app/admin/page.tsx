import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function AdminOverview() {
    const [users, resumes, premium, aiUsage, payments] = await Promise.all([
        prisma.user.count(),
        prisma.resume.count(),
        prisma.user.count({ where: { plan: "PREMIUM" } }),
        prisma.aIUsage.count(),
        prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "SUCCEEDED" } }),
    ]);
    const stats = [
        { l: "Total Users", v: users }, { l: "Premium", v: premium }, { l: "Resumes", v: resumes }, { l: "AI Calls", v: aiUsage },
        { l: "Revenue (cents/paisa)", v: payments._sum.amount ?? 0 },
    ];
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                {stats.map((s) => (
                    <Card key={s.l} className="p-5">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                        <div className="mt-2 text-3xl font-bold text-gradient">{s.v}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
