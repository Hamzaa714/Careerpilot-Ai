import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckoutButton } from "./checkout-button";

export default async function BillingPage() {
    const session = await auth();
    const user = await prisma.user.findUnique({ where: { id: session!.user.id }, include: { subscription: true } });
    const used = user?.aiCreditsUsed ?? 0;
    const limit = user?.aiCreditsLimit ?? 20;
    const pct = Math.min(100, Math.round((used / Math.max(1, limit)) * 100));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>

            <Card className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs uppercase text-muted-foreground">Current Plan</div>
                        <div className="mt-1 text-2xl font-bold">{user?.plan === "PREMIUM" ? "Premium" : "Free"}</div>
                    </div>
                    <Badge variant={user?.plan === "PREMIUM" ? "gradient" : "outline"}>{user?.plan === "PREMIUM" ? "Active" : "Upgrade available"}</Badge>
                </div>
                {user?.plan !== "PREMIUM" && (
                    <div className="mt-4">
                        <CheckoutButton />
                        <div className="mt-3 text-xs text-muted-foreground">Or pay in PKR via JazzCash / Easypaisa (coming soon).</div>
                    </div>
                )}
            </Card>

            <Card className="p-6">
                <div className="text-xs uppercase text-muted-foreground">AI Credits</div>
                <div className="mt-1 text-3xl font-bold">{used} / {limit}</div>
                <Progress value={pct} className="mt-3" />
            </Card>
        </div>
    );
}
