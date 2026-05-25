import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const sig = req.headers.get("stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!sig || !secret) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    const body = await req.text();
    let event: any;
    try {
        event = stripe.webhooks.constructEvent(body, sig, secret);
    } catch (e: any) {
        return NextResponse.json({ error: `Webhook error: ${e.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const s = event.data.object;
        const userId = s.metadata?.userId;
        if (userId) {
            await prisma.user.update({ where: { id: userId }, data: { plan: "PREMIUM", aiCreditsLimit: 100000 } });
            await prisma.subscription.upsert({
                where: { userId },
                update: { plan: "PREMIUM", status: "ACTIVE", stripeCustomerId: s.customer as string, stripeSubscriptionId: s.subscription as string },
                create: { userId, plan: "PREMIUM", status: "ACTIVE", stripeCustomerId: s.customer as string, stripeSubscriptionId: s.subscription as string },
            });
            await prisma.payment.create({ data: { userId, provider: "STRIPE", amount: s.amount_total ?? 0, currency: (s.currency ?? "usd").toUpperCase(), status: "SUCCEEDED", reference: s.id } });
        }
    }
    if (event.type === "customer.subscription.deleted") {
        const sub = event.data.object;
        const dbSub = await prisma.subscription.findFirst({ where: { stripeSubscriptionId: sub.id } });
        if (dbSub) {
            await prisma.subscription.update({ where: { id: dbSub.id }, data: { status: "CANCELED", plan: "FREE" } });
            await prisma.user.update({ where: { id: dbSub.userId }, data: { plan: "FREE", aiCreditsLimit: 20 } });
        }
    }
    return NextResponse.json({ received: true });
}
