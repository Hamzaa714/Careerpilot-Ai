import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { AIFeature } from "@prisma/client";

export async function requireUserAndCredit(feature: AIFeature) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized", status: 401 as const };
    const u = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!u) return { error: "User not found", status: 404 as const };
    if (u.plan === "FREE" && u.aiCreditsUsed >= u.aiCreditsLimit) {
        return { error: "AI credits exhausted. Upgrade to Premium.", status: 402 as const };
    }
    await prisma.user.update({ where: { id: u.id }, data: { aiCreditsUsed: { increment: 1 } } });
    await prisma.aIUsage.create({ data: { userId: u.id, feature } });
    return { userId: u.id };
}
