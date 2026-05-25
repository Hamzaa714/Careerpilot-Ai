import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsers() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <Card className="overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-card/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                        <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Plan</th><th className="p-3">Role</th><th className="p-3">Joined</th></tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t">
                                <td className="p-3">{u.name || "—"}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3"><Badge variant={u.plan === "PREMIUM" ? "gradient" : "outline"}>{u.plan}</Badge></td>
                                <td className="p-3">{u.role}</td>
                                <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
