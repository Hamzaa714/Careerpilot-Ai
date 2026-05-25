import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe, PLAN_PRICES } from "@/lib/stripe";
import { SITE } from "@/lib/site";

export async function POST() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!PLAN_PRICES.PREMIUM_STRIPE_PRICE_ID) {
        return NextResponse.json({ error: "Stripe not configured. Set STRIPE_PRICE_PREMIUM." }, { status: 400 });
    }
    const checkout = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: PLAN_PRICES.PREMIUM_STRIPE_PRICE_ID, quantity: 1 }],
        customer_email: session.user.email!,
        success_url: `${SITE.url}/dashboard/billing?success=1`,
        cancel_url: `${SITE.url}/dashboard/billing?canceled=1`,
        metadata: { userId: session.user.id },
    });
    return NextResponse.json({ url: checkout.url });
}
